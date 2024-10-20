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
  const {fastapiResponse, setFastapiResponse} = useContext(ContentContext)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [intervalId, setIntervalId] = useState<number | null>(null)

  const [rebaScore, setRebaScore] = useState<number | null>(null)
  const [videoRebaScore, setVideoRebaScore] = useState<number | null>(null)
  const [stats, setStats] = useState<ClassDictionary | null>(null)

  useEffect(() => {
    // Initialize the webcam feed
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    })

    startWebSocketConnection() // Start WebSocket connection immediately
  }, [])

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
      setSocket(null) // Clear the socket state
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
    // Initialize the webcam feed
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    })

    startWebSocketConnection() // Start WebSocket connection
  }

  return (
    <div>
      <h1>Real-Time Ergonomic Assessment</h1>
      <video ref={videoRef} style={{ width: '640px', height: '480px' }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }}
        width="640"
        height="480"
      />
      {/* Removed the button for starting detection */}
      {rebaScore !== null && <p>REBA Score: {rebaScore}</p>}
      {videoRebaScore !== null && <p>Average REBA Score: {videoRebaScore}</p>}
      <button onClick={stopWebSocketConnection}>Stop Recording</button>
      <button onClick={startRecording}>Start Recording</button>
    </div>
  )
}

export default PoseDetection
