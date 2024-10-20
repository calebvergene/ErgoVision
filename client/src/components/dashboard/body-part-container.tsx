'use client'

import { useContext } from 'react'
import BodyPartCard from './body-part-card'
import { ContentContext } from './content'

const BodyPartContainer = () => {
  const { fastapiResponse } = useContext(ContentContext)
  const limbScores = fastapiResponse?.limb_scores

  return (
    <div className="mt-4 flex-1 overflow-x-scroll px-3">
      <div className="rounded-m flex gap-2 rounded-md bg-white">
        {Object.entries(limbScores ?? {})
          .sort((a, b) => b[1] - a[1]) // Sort by score in descending order
          .map(([limb, score], index) => {
            const formattedLimb = limb.replace(/_/g, ' ')
            return (
              <BodyPartCard
                key={index}
                bodyPart={formattedLimb}
                score={score}
              />
            )
          })}
      </div>
    </div>
  )
}

export default BodyPartContainer
