import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import React, { useRef, useState } from 'react'
import { ContentContext } from './content'

interface FileUploadProps {
  closeModal: () => void
}

const FileUploadModal: React.FC<FileUploadProps> = ({ closeModal }) => {
  const { setFastapiResponse } = React.useContext(ContentContext)

  const formRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [video, setVideo] = useState<File | null>(null)

  // Handle video file selection
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideo(event.target.files[0])
    }
  }

  // Handle form submission to upload video
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!video) {
      alert('Please select a video file')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', video)

      const response = await fetch('http://localhost:8000/api/upload-video', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log(data)
      setFastapiResponse(data)
      closeModal()
    } catch (error) {
      console.error('Error uploading video:', error)
    }
  }

  // Handle file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Remove selected video
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
        className="relative w-full max-w-md rounded-lg bg-white px-6 pb-6 shadow-xl"
      >
        <div ref={formRef} className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              ref={fileInputRef}
              className="hidden"
            />

            {/* Upload Button or Video Preview */}
            {!video ? (
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-10 text-center hover:border-gray-400 focus:outline-none"
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
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded bg-[#085E69] px-4 py-2 text-sm font-semibold text-white hover:bg-[#085E69]/80 focus:outline-none"
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default FileUploadModal
