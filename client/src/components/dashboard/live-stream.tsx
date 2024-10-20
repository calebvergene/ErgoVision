'use client'

import type { ClassDictionary } from 'clsx'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ContentContext } from './content'

interface Keypoint {
  x: number
  y: number
}

interface RebaResult {
  reba_score: number
  keypoints: Keypoint[]
}

const IMAGE_INTERVAL_MS = 100 // Sending frames every 100ms
const PoseDetection: React.FC = () => {
  const { fastapiResponse, setFastapiResponse } = useContext(ContentContext)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [alternateContent, setAlternateContent] = useState<string | null>(null)

  const [rebaScore, setRebaScore] = useState<number | null>(null)
  const [videoRebaScore, setVideoRebaScore] = useState<number | null>(null)
  const [stats, setStats] = useState<ClassDictionary | null>(null)

  useEffect(() => {
    // Initialize the webcam feed when recording starts
    if (socket) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      })
    }
  }, [socket])

  const drawKeypoints = (keypoints: Keypoint[]) => {
    const canvas = canvasRef.current
    const video = videoRef.current

    if (!canvas || !video) return
  }

  const startWebSocketConnection = () => {
    const ws = new WebSocket('ws://localhost:8000/ws/process-video')
    setSocket(ws)

    ws.onopen = () => {
      const id = setInterval(() => {
        const video = videoRef.current
        if (!video) return

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0) // Convert the frame to JPEG and send it to the WebSocket

        canvas.toBlob((blob) => {
          if (blob && ws.readyState === WebSocket.OPEN) {
            blob.arrayBuffer().then((buffer) => ws.send(buffer))
          }
        }, 'image/jpeg')
      }, IMAGE_INTERVAL_MS)
      setIntervalId(id as unknown as number)

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setFastapiResponse(data)
        console.log(data)
        setRebaScore(data['reba_score'])
        setVideoRebaScore(data['video_reba_score'])
        setStats(data['stats'])

        drawKeypoints(data['keypoints']) // Draw the keypoints on the canvas
      }

      ws.onclose = () => {
        clearInterval(intervalId as unknown as number)
        setIntervalId(null)
      }
    }
  }

  const stopWebSocketConnection = () => {
    if (socket) {
      socket.close()
      setSocket(null)
      setShowVideo(true)
      setAlternateContent('Live stream has been stopped.')
    }
    if (intervalId !== null) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    const video = videoRef.current
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop()) // Stop all tracks of the video stream
      video.srcObject = null // Clear the video source
    }
  }

  const startRecording = () => {
    startWebSocketConnection() // Start WebSocket connection
    setShowVideo(false) // Set showVideo to false
  }

  return (
    <div>
      {showVideo ? (
        <video
          src={alternateContent || ''}
          style={{ width: '640px', height: '480px' }}
        />
      ) : (
        <video ref={videoRef} style={{ width: '640px', height: '480px' }} />
      )}
      <div className="flex w-[640px]">
        {socket === null ? (
          <button
            className="mb-5 ml-2 mt-3 flex rounded-xl bg-[#085E69] px-4 py-3 text-white"
            onClick={startRecording}
          >
            ⦿ Start Recording
          </button>
        ) : (
          <>
            <button
              className="mb-5 ml-2 mt-3 flex rounded-xl bg-[#085E69] px-4 py-3 text-white"
              onClick={stopWebSocketConnection}
            >
              ◼︎ Stop Recording
            </button>
            {rebaScore !== null && (
              <button className="mb-5 ml-2 mt-[0.9rem] flex rounded-3xl px-3 py-1 text-3xl font-bold text-[#085E69]">
                {rebaScore}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PoseDetection
