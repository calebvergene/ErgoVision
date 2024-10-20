'use client'

import { useContext } from 'react'
import { ContentContext } from '../content'

interface CriticalFrameCardProps {
  criticalLimbs: Record<string, any>
  img: string
}

const CriticalFrameCard = ({ criticalLimbs, img }: CriticalFrameCardProps) => {
  const { fastapiResponse, setCriticalFramesView } = useContext(ContentContext)
  const keyframe = Object.keys(criticalLimbs)[0]
  return (
    <button
      onClick={() => setCriticalFramesView(keyframe)}
      className="h-fit w-auto rounded-md object-cover"
    >
      <img
        src={`/${img}`}
        style={{ opacity: keyframe === '102' ? 1 : 0.5 }}
        className="max-h-60"
      />
    </button>
  )
}

const CriticalFrames = () => {
  const { fastapiResponse } = useContext(ContentContext)

  const criticalFrames = fastapiResponse?.critical_frames || []
  console.log(criticalFrames)

  return (
    <div className="flex h-fit w-full gap-1 overflow-x-scroll px-3">
      {criticalFrames.map((frame, index) => (
        <CriticalFrameCard
          key={index}
          criticalLimbs={frame.critical_limbs || {}}
          img={frame.img}
        />
      ))}
    </div>
  )
}

export default CriticalFrames
