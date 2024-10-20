'use client'

import { useContext } from 'react'
import { ContentContext } from '../content'
import BarGraph from './bar-graph'

const MskRiskContainer = () => {
  const { fastapiResponse } = useContext(ContentContext)

  return (
    <div className="flex-0 flex flex-col gap-1">
      <BarGraph
        title="Overall Assessment"
        stats={fastapiResponse?.percentages.reba_stats}
      />
      <div className="grid w-full flex-1 grid-cols-2 grid-rows-2 gap-1">
        <BarGraph
          title="Trunk"
          stats={fastapiResponse?.percentages.trunk_stats}
        />
        <BarGraph
          title="Upper Arm"
          stats={fastapiResponse?.percentages.upper_arm_stats}
        />
        <BarGraph
          title="Lower Arm"
          stats={fastapiResponse?.percentages.lower_arm_stats}
        />
        <BarGraph
          title="Neck"
          stats={fastapiResponse?.percentages.neck_stats}
        />
        <BarGraph
          title="Wrist"
          stats={fastapiResponse?.percentages.wrist_stats}
        />
        <BarGraph title="Leg" stats={fastapiResponse?.percentages.leg_stats} />
      </div>
    </div>
  )
}

export default MskRiskContainer
