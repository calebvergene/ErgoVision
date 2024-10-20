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
  criticalFramesView: number // assuming this is a number representing the keyframe
}) => {
  const { fastapiResponse, setCriticalFramesView } = useContext(ContentContext)

  // Find the keyframe based on the criticalFramesView (e.g., 95 or 103)
  const frame = fastapiResponse?.critical_frames.find(
    (frame) =>
      frame.critical_limbs &&
      Object.keys(frame.critical_limbs).includes(criticalFramesView.toString()),
  )

  return (
    <div className="flex h-full w-full gap-2 rounded-md bg-[#F9F9F9] p-2">
      <div className="flex h-full w-1/2 flex-col gap-2 rounded-md bg-white">
        <div className="flex aspect-video w-full items-center justify-center rounded-md bg-white">
          {frame ? (
            <img
              src={`/${frame.img}`}
              alt="Keyframe image"
              className="max-h-80"
            />
          ) : (
            <p>No keyframe found for {criticalFramesView}</p>
          )}
        </div>
        <CriticalLimbs />
      </div>
      <div className="flex h-full w-1/2 flex-col gap-2 rounded-md bg-white">
        <Trunk
          degree={frame?.critical_limbs?.[criticalFramesView]?.[0]?.trunk ?? 0}
        />
        <Wrist degree={0} />
        <LowerArm
          degree={
            frame?.critical_limbs?.[criticalFramesView]?.[2]?.lower_arm ?? 0
          }
        />
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
