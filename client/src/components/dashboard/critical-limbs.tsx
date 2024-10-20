'use client'

import { useContext, useState } from 'react'
import { ContentContext } from './content'

const CriticalLimbs = () => {
  const { fastapiResponse } = useContext(ContentContext)
  const criticalFrames = fastapiResponse?.critical_frames || []
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0)

  const handleNextFrame = () => {
    setSelectedFrameIndex(
      (prevIndex) => (prevIndex + 1) % criticalFrames.length,
    )
  }

  const handlePreviousFrame = () => {
    setSelectedFrameIndex(
      (prevIndex) =>
        (prevIndex - 1 + criticalFrames.length) % criticalFrames.length,
    )
  }

  return (
    <div className="flex w-full flex-1 flex-col rounded-md bg-white">
      <div className="p-2">
        <h1 className="text-2xl font-semibold text-[#0161E8]">
          Critical Limbs
        </h1>
        <p className="text-sm text-gray-500">
          These are the limbs that are most critical to the action.
        </p>
      </div>
      {/* Buttons to navigate frames */}
      <div className="flex justify-between p-2">
        <button onClick={handlePreviousFrame} className="border p-1">
          Previous Frame
        </button>
        <button onClick={handleNextFrame} className="border p-1">
          Next Frame
        </button>
      </div>
      {/* Display only the selected frame */}
      {criticalFrames[selectedFrameIndex] && (
        <div
          key={selectedFrameIndex}
          className="flex items-center gap-4 border-b border-gray-300 p-4"
        >
          <div className="flex-1">
            <div className="font-medium">Frame {selectedFrameIndex + 1}</div>
            <div className="flex flex-wrap gap-4">
              {criticalFrames[selectedFrameIndex].critical_limbs &&
                Object.entries(
                  criticalFrames[selectedFrameIndex].critical_limbs,
                ).map(([limbId, limbs]) => {
                  console.log(limbId, limbs)
                  return (
                    <div key={limbId} className="flex flex-col">
                      {Array.isArray(limbs) ? (
                        limbs.map((limb, limbIndex) => (
                          <div
                            key={limbIndex}
                            className="flex items-center gap-2"
                          >
                            <span className="font-semibold">
                              {Object.keys(limb)[0]}:
                            </span>
                            <span>{Object.values(limb)[0].toFixed(2)}°</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {Object.keys(limbs)[0]}:
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CriticalLimbs
