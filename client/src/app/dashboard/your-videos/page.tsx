const videos = [
  { src: '/dashboard/testvideo.mp4', caption: 'Video 1' },
  // Add more video objects as needed
]

const page = () => {
  return (
    <div className="flex h-full w-full flex-col p-2">
      {videos.map((video, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-[#b6b6b6] p-4"
        >
          <div className="aspect-video h-24 flex-shrink-0">
            <video
              className="h-full w-full rounded-md object-cover"
              src={video.src}
              autoPlay
              muted
              loop
            />
          </div>
          <div className="flex-1">
            <div className="font-medium">{video.caption}</div>
            <div className="text-sm text-gray-600">
              Last modified: June 12, 2024
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page
