'use client'

import { useContext } from 'react'
import { ContentContext } from '../content'

interface CriticalFrameCardProps {
  criticalLimbs: Record<string, any>
}

const CriticalFrameCard = ({ criticalLimbs }: CriticalFrameCardProps) => {
  const { setCriticalFramesView } = useContext(ContentContext)
  const keyframe = Object.keys(criticalLimbs)[0]
  return (
    <button
      onClick={() => setCriticalFramesView(keyframe)}
      className="h-fit w-auto rounded-md object-cover"
    >
      <img
        src={`https://placehold.co/300x200?text=${keyframe}`}
        style={{ opacity: keyframe === '102' ? 1 : 0.5 }}
      />
      {/* <div>
        {Object.entries(criticalLimbs).map(([limb, angles], index) => (
          <div key={index}>
            <strong>{limb}:</strong>{' '}
            {angles.map((angle: any) => JSON.stringify(angle)).join(', ')}
          </div>
        ))}
      </div> */}
    </button>
  )
}

const CriticalFrames = () => {
  const { fastapiResponse } = useContext(ContentContext)

  const criticalFrames = fastapiResponse?.critical_frames || []
  return (
    <div className="flex h-fit w-full gap-1 overflow-x-scroll px-3">
      {criticalFrames.map((frame, index) => (
        <CriticalFrameCard
          key={index}
          criticalLimbs={frame.critical_limbs || {}}
        />
      ))}
    </div>
  )
}

export default CriticalFrames
