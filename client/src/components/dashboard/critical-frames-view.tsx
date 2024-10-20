import { XMarkIcon } from '@heroicons/react/16/solid'
import { useContext } from 'react'
import { ContentContext } from './content'
import CriticalLimbs from './critical-limbs'
import LowerArm from './limbs/lower-arm'
import Trunk from './limbs/trunk'
import Wrist from './limbs/wrist'

const CriticalFramesView = ({
  criticalFramesView,
}: {
  criticalFramesView: string
}) => {
  const { setCriticalFramesView } = useContext(ContentContext)
  return (
    <div className="flex h-full w-full gap-2 rounded-md bg-[#F9F9F9] p-2">
      <div className="flex h-full w-1/2 flex-col gap-2 rounded-md bg-white">
        <div className="aspect-video w-full rounded-md bg-black"></div>
        <CriticalLimbs />
      </div>
      <div className="flex h-full w-1/2 flex-col gap-2 rounded-md bg-white">
        <Trunk />
        <LowerArm />
        <Wrist />
      </div>
      <button
        onClick={() => setCriticalFramesView(null)}
        className="flex h-full flex-col justify-start"
      >
        <XMarkIcon className="h-6 w-6 self-start" />
      </button>
    </div>
  )
}

export default CriticalFramesView
