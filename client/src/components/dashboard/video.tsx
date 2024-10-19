const VideoWrapper = () => {
  return (
    <video
      controls
      className="flex aspect-video h-fit w-full rounded-md bg-white"
    >
      <source src="/dashboard/testvideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoWrapper
