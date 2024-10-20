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
    <div className="flex w-full flex-1 flex-col rounded-lg bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-gray-900">Critical Limbs</h1>
        <p className="text-md mb-4 text-gray-500">
          These are the limbs that are most critical to the action.
        </p>
      </div>
      <div className="flex justify-between px-4 pb-4">
        <button
          onClick={handlePreviousFrame}
          className="rounded-lg bg-[#085E69] px-6 py-3 text-white hover:bg-[#064c56] focus:outline-none focus:ring-2 focus:ring-[#085E69] focus:ring-offset-2"
        >
          Previous Frame
        </button>
        <button
          onClick={handleNextFrame}
          className="rounded-lg bg-[#085E69] px-6 py-3 text-white hover:bg-[#064c56] focus:outline-none focus:ring-2 focus:ring-[#085E69] focus:ring-offset-2"
        >
          Next Frame
        </button>
      </div>
      {criticalFrames[selectedFrameIndex] && (
        <div key={selectedFrameIndex} className="p-4">
          <h2 className="mb-4 text-lg font-medium text-gray-800">
            Frame {selectedFrameIndex + 1}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Limb
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Angle (°)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {criticalFrames[selectedFrameIndex].critical_limbs &&
                  Object.entries(
                    criticalFrames[selectedFrameIndex].critical_limbs,
                  ).map(([limbId, limbs]) =>
                    Array.isArray(limbs) ? (
                      limbs.map((limb, limbIndex) => (
                        <tr
                          key={`${limbId}-${limbIndex}`}
                          className="hover:bg-gray-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                            {Object.keys(limb)[0]}
                          </td>
                          <td
                            className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${Object.values(limb)[0] > 90 ? 'text-red-600' : 'text-gray-800'}`}
                          >
                            {Object.values(limb)[0].toFixed(2)}°
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={limbId} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                          {Object.keys(limbs)[0]}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-800">
                          N/A
                        </td>
                      </tr>
                    ),
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default CriticalLimbs
