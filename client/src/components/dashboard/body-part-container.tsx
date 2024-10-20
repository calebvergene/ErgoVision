'use client'

import { useContext } from 'react'
import BodyPartCard from './body-part-card'
import { ContentContext } from './content'

import Legs from '@/../public/bodyparts/leg.png'
import LowerArm from '@/../public/bodyparts/lowerarm.png'
import Neck from '@/../public/bodyparts/neck.png'
import Trunk from '@/../public/bodyparts/trunk.png'
import UpperArm from '@/../public/bodyparts/upperarm.png'
import Wrist from '@/../public/bodyparts/wrist.png'

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
            const combinedFormattedLimb = formattedLimb
              .toLowerCase()
              .split(' ')
              .join('')
              .split('score')
              .join('')
            const limbImage = {
              trunk: Trunk,
              upperarm: UpperArm,
              lowerarm: LowerArm,
              leg: Legs,
              wrist: Wrist,
              neck: Neck,
            }
            console.log(combinedFormattedLimb)
            return (
              <BodyPartCard
                key={index}
                bodyPart={formattedLimb}
                score={score}
                img={limbImage[combinedFormattedLimb as keyof typeof limbImage]}
              />
            )
          })}
      </div>
    </div>
  )
}

export default BodyPartContainer
