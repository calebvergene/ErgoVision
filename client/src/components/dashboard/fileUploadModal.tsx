import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'; // Correct the import here
import React, { useRef, useState } from 'react';

interface FileUploadProps {
  closeModal: () => void;
}

const FileUploadModal: React.FC<FileUploadProps> = ({ closeModal }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!video) {
      alert('Please select a video file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', video);

      const response = await fetch('http://localhost:8000/api/upload-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Server Response:', data);
      closeModal(); // Close modal after successful upload
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-8 backdrop-blur"
    >
      <div
        onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Upload Video</h2>
        <div ref={formRef} className="w-full">
          <form onSubmit={handleSubmit} className="text-center">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleUploadClick}
              className="w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <ArrowUpTrayIcon className="mx-auto h-12 w-12 fill-gray-400" />
              <span className="block text-lg font-semibold text-gray-900">
                {video ? video.name : 'Upload Video'}
              </span>
            </button>

            {video && (
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-indigo-600 p-2 text-white"
              >
                Submit Video
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
