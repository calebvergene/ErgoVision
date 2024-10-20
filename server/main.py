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
uuid1 = uuid.uuid1()

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
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(await file.read())

        # Open the video using OpenCV
        cap = cv2.VideoCapture(temp_file_path)
        if not cap.isOpened():
            return JSONResponse(content={"error": "Unable to read video file"}, status_code=400)

        # Initialize the pose detector
        pose_detector = poseDetector()

        frame_width = int(cap.get(3))  # Width of the frames
        frame_height = int(cap.get(4))  # Height of the frames

        # Set up the VideoWriter to save the processed video
        out = cv2.VideoWriter(f'../client/public/{uuid1}.mp4', cv2.VideoWriter_fourcc(*'XVID'), 20.0, (frame_width, frame_height))


        ## Processes image frames
        while True:
            #raw_img = cv2.imread('PoseVideos/13.png')

            success, raw_img = cap.read()

            # Break the loop if the video ends
            if not success:
                print("Finished processing video.")
                break

            if raw_img is None:
                print("Warning: Captured frame is None.")
                continue
        
            img = pose_detector.find_pose(raw_img)
            #img = pose_detector.blur_face(img)
            

            try:
                execute_REBA_test(pose_detector, img)
            except Exception as e:
                print('Error:', e)
                continue
            
            out.write(img)
            pose_detector.timestamp += 1
        # Release the video after processing
        cap.release()
        out.release()
        os.remove(temp_file_path)
        pose_stats = pose_detector.process_all_stats()

        pose_detector.filter_critical_poses(uuid1)

        return JSONResponse(content={
            "message": "Video processed successfully", 
            "video": f"{uuid1}.mp4",
            "total_frames": pose_detector.timestamp,
            "critical_frames": pose_detector.critical_poses, 
            "video_reba_score":pose_detector.average_reba_score,
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

            # Send the processed data (REBA score and keypoints) back to the frontend
            result = {'reba_score': reba}
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
