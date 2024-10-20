'use client'

import { ContentContext } from '@/components/dashboard/content'
import { useContext } from 'react'

const VideoWrapper = () => {
  const { fastapiResponse } = useContext(ContentContext)
  const videoUrl =
    fastapiResponse && fastapiResponse.video
      ? `/${fastapiResponse.video}`
      : '/dashboard/testvideo.mp4'
  return (
    <video
      controls
      src={videoUrl}
      className="flex aspect-video h-fit w-full rounded-md bg-white"
    >
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoWrapper
