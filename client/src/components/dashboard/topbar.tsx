'use client'

import { useState } from 'react'
import FileUploadModal from './fileUploadModal' // Import the FileUploadModal
import RecordButton from './top-bar/record-button'
import UploadButton from './top-bar/upload-button'

const TopBar = () => {
  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false)

  const closeModal = () => {
    setIsFileModalOpen(false)
  }

  return (
    <div className="flex justify-end rounded-xl bg-white p-4">
      <RecordButton />
      <UploadButton onClick={() => setIsFileModalOpen(!isFileModalOpen)} />

      {/* Conditionally render the modal when open */}
      {isFileModalOpen && (
        <div className="fixed left-0 top-0 z-10 h-full w-full overflow-auto bg-black bg-opacity-50">
          <FileUploadModal closeModal={closeModal} />
        </div>
      )}
    </div>
  )
}

export default TopBar
