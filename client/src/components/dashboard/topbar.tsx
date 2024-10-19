'use client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { ContentContext } from './content'

const TopBar = () => {
  const { user } = useContext(ContentContext)
  return (
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
        <button className="fi flex items-center justify-center whitespace-nowrap rounded-md bg-[#EEF1F4] px-6 py-4 text-[#545F71]">
          <PlusCircleIcon className="mr-2 h-6 w-6 stroke-2" />
          <span className="font-semibold">Upload Video</span>
        </button>
      </div>
    </div>
  )
}

export default TopBar
