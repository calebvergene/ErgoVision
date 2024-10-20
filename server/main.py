from fastapi import FastAPI, File, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from io import BytesIO
from pose_module import poseDetector
from REBA_calc import execute_REBA_test
import asyncio
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI()

origins = ["*"]
pose_detector = poseDetector()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload-video")
async def upload_video(file: UploadFile = File(...)):
    try:
        # Save the uploaded video file to a temporary location
        temp_file_path = f"temp_{uuid.uuid4()}_{file.filename}"
        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(await file.read())

        # Open the video using OpenCV
        cap = cv2.VideoCapture(temp_file_path)
        if not cap.isOpened():
            return JSONResponse(content={"error": "Unable to read video file"}, status_code=400)

        # Initialize the pose detector
        frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))  # Width of the frames
        frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))  # Height of the frames
        frame_fps = cap.get(cv2.CAP_PROP_FPS)  # FPS of the video

        # Set up the VideoWriter to save the processed video
        output_filename = f'{uuid.uuid4()}.mp4'
        output_path = os.path.join("../client/public", output_filename)
        absolute_output_path = os.path.abspath(output_path)

        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, frame_fps, (frame_width, frame_height))

        # Processes image frames
        while True:
            success, raw_img = cap.read()

            # Break the loop if the video ends
            if not success:
                print("Finished processing video.")
                break

            if raw_img is None:
                print("Warning: Captured frame is None.")
                continue
        
            img = pose_detector.find_pose(raw_img)
            
            try:
                execute_REBA_test(pose_detector, img)
            except Exception as e:
                print('Error:', e)
                continue
            
            # Write the processed frame to the video
            out.write(img)
            pose_detector.timestamp += 1
        
        # Release the video after processing
        cap.release()
        out.release()

        # Check if the output file was created
        if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
            return JSONResponse(content={"error": "No frames were written to the output video"}, status_code=500)

        # Re-encode the video using ffmpeg
        rec_filename = output_filename.replace('.mp4', '-r.mp4')
        rec_path = os.path.join("../client/public", rec_filename)
        absolute_rec_path = os.path.abspath(rec_path)
        os.system(f"ffmpeg -i {absolute_output_path} -c:v libx264 -c:a aac {absolute_rec_path}")

        pose_stats = pose_detector.process_all_stats()
        pose_detector.filter_critical_poses(output_filename)

        return JSONResponse(content={
            "message": "Video processed successfully", 
            "video": rec_filename,
            "total_frames": pose_detector.timestamp,
            "critical_frames": pose_detector.critical_poses, 
            "video_reba_score": pose_detector.average_reba_score,
            "percentages": pose_stats,
            "limb_scores": pose_detector.process_all_limb_scores(pose_stats)
        }, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": f"An error occurred: {str(e)}"}, status_code=500)


class REBAResult(BaseModel):
    reba_score: int
    keypoints: list

async def receive(websocket: WebSocket, queue: asyncio.Queue):
    """
    Receives video frames from the WebSocket and adds them to the queue.
    """
    data = await websocket.receive_bytes()
    try:
        queue.put_nowait(data)
    except asyncio.QueueFull:
        pass

async def process_video(websocket: WebSocket, queue: asyncio.Queue):
    """
    Processes video frames using OpenCV and MediaPipe, then sends
    REBA results back to the frontend.
    """
    while True:
        data = await queue.get()
        img_array = np.frombuffer(data, np.uint8)
        img = cv2.imdecode(img_array, 1)

        if img is None:
            continue

        img = pose_detector.find_pose(img)  

        try:
            # Execute REBA test and get the results
            execute_REBA_test(pose_detector, img)
            reba = pose_detector.reba_score
            pose_stats = pose_detector.process_all_stats()

            # Send the processed data (REBA score and keypoints) back to the frontend
            result = {
                'reba_score': reba,
                "video_reba_score": pose_detector.average_reba_score,
                "percentages": pose_stats,
            }
            await websocket.send_json(result)
        except Exception as e:
            print(f"Error: {e}")
            continue

@app.websocket("/ws/process-video")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint that handles the video stream from the frontend.
    """
    await websocket.accept()
    queue = asyncio.Queue(maxsize=10)
    process_task = asyncio.create_task(process_video(websocket, queue))

    try:
        while True:
            await receive(websocket, queue)
    except WebSocketDisconnect:
        process_task.cancel()
        await websocket.close()
        # Reset the pose detector stats when WebSocket disconnects
        pose_detector.total_reba_score = 0
        pose_detector.timestamp = 0
        pose_detector.reba_stats = {"good": 0, "fair": 0, "poor": 0}
        pose_detector.upper_arm_stats = {"good": 0, "fair": 0, "poor": 0}
        pose_detector.lower_arm_stats = {"good": 0, "fair": 0, "poor": 0}
        pose_detector.trunk_stats = {"good": 0, "fair": 0, "poor": 0}
        pose_detector.leg_stats = {"good": 0, "fair": 0, "poor": 0}
        pose_detector.neck_stats = {"good": 0, "fair": 0, "poor": 0}
        pose_detector.wrist_stats = {"good": 0, "fair": 0, "poor": 0}
