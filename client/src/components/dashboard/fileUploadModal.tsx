import { ArrowUpTrayIcon } from '@heroicons/react/16/solid'
import React, { useRef, useState } from 'react'

interface FileUploadProps {
  closeModal: () => void
}

const FileUploadModal: React.FC<FileUploadProps> = ({ closeModal }) => {
  const formRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [video, setVideo] = useState<File | null>(null)

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideo(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (video) {
      console.log('Video file:', video)
      // Add additional handling logic here
    } else {
      console.log('No video selected')
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveVideo = () => {
    setVideo(null)
  }

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Upload Video
        </h2>
        <div ref={formRef} className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              ref={fileInputRef}
              className="hidden"
            />
            {!video ? (
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-10 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <ArrowUpTrayIcon className="mb-3 h-12 w-12 text-gray-400" />
                <span className="block text-lg font-semibold text-gray-700">
                  Upload Video
                </span>
              </button>
            ) : (
              <div className="space-y-4">
                <video
                  controls
                  src={URL.createObjectURL(video)}
                  className="max-h-[50vh] w-full rounded-lg object-contain"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Remove Video
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-[#0161E8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0161E8]/80 focus:outline-none focus:ring-2 focus:ring-[#0161E8] focus:ring-offset-2"
                  >
                    Analyze
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default FileUploadModal
