"use client"

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { ContentContext } from './content';
import FileUploadModal from './fileUploadModal';  // Import the FileUploadModal

const TopBar = () => {
  const { user } = useContext(ContentContext);
  
  // Modal state for opening and closing the file upload modal
  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false);

  // Function to open the modal
  const openFileModal = () => {
    setIsFileModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsFileModalOpen(false);
  };

  return (
    <div>
      <div
        id="top-bar"
        className="flex h-1/6 w-full items-center justify-between rounded-md bg-[#F5F5F5] p-8"
      >
        <div id="id, name, jobtype" className="flex gap-x-4">
          <div className="h-16 w-16 rounded-full bg-[#DEDEDE]" />
          <div className="my-auto">
            <h2 className="text-lg font-semibold text-[#545F71]">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-[#545F71]">
              Company: {user?.company} | Industry: {user?.industry}
            </p>
          </div>
        </div>
        <div id="status">
          <button 
            className="fi flex items-center justify-center whitespace-nowrap rounded-md bg-[#EEF1F4] px-6 py-4 text-[#545F71]" 
            onClick={openFileModal}  // Open modal on button click
          >
            <PlusCircleIcon className="mr-2 h-6 w-6 stroke-2" />
            <span className="font-semibold">Upload Video</span>
          </button>
        </div>
      </div>

      {/* Conditionally render the modal when open */}
      {isFileModalOpen && (
        <div className="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-50">
          <div className="m-4 p-4 w-4/5 mx-auto bg-white rounded-md shadow-lg">
            <FileUploadModal closeModal={closeModal} />  {/* Modal with close function */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
