import { XMarkIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useContext } from 'react'
import { ContentContext } from './content'

import zeroToSixtyDeg from '@/../public/dashboard/trunk/0-20.png'
import zeroDeg from '@/../public/dashboard/trunk/0.png'
import twentyToSixtyDeg from '@/../public/dashboard/trunk/20-60.png'
import sixtyDegForward from '@/../public/dashboard/trunk/60.png'

import zeroToSixtyDegLowerArm from '@/../public/dashboard/lowerarm/0-60.png'
import zeroDegLowerArm from '@/../public/dashboard/lowerarm/0.png'
import hundredDegLowerArm from '@/../public/dashboard/lowerarm/100.png'

import zeroDegWrist from '@/../public/dashboard/wrist/15.png'
import thirtyDegreeWrist from '@/../public/dashboard/wrist/15down.png'
import fortyFiveDegreeWrist from '@/../public/dashboard/wrist/15up.png'

const trunkImages = {
  '0°': zeroDeg,
  '0-20°': zeroToSixtyDeg,
  '20-60°': twentyToSixtyDeg,
  '60°': sixtyDegForward,
}

const lowerArmImages = {
  '0°': [zeroDegLowerArm],
  '0-60° & 100°': [zeroToSixtyDegLowerArm, hundredDegLowerArm],
}

const wristImages = {
  '15°': [zeroDegWrist],
  '15° up & down': [thirtyDegreeWrist, fortyFiveDegreeWrist],
}

const trunkImageOrder = ['0°', '0-20°', '20-60°', '60°']

const CriticalFramesView = ({
  criticalFramesView,
}: {
  criticalFramesView: string
}) => {
  const { setCriticalFramesView } = useContext(ContentContext)
  return (
    <div className="flex h-full w-full gap-2 rounded-md bg-[#F9F9F9] p-2">
      {/* <button onClick={() => setCriticalFramesView(null)}>
        <XMarkIcon className="h-6 w-6" />
      </button> */}
      <div className="flex h-full w-1/2 flex-col gap-2 rounded-md bg-white">
        <div className="aspect-video w-full rounded-md bg-black"></div>
        <div className="flex w-full flex-1 flex-col rounded-md bg-white">
          <div className="p-2">
            <h1 className="text-2xl font-semibold text-[#0161E8]">
              Critical Limbs
            </h1>
            <p className="text-sm text-gray-500">
              These are the limbs that are most critical to the action.
            </p>
          </div>
          {[0, 0, 0].map((_, index) => (
            <div key={index} className="flex w-full flex-1">
              <div className="aspect-square h-full bg-blue-300"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-full w-1/2 flex-col gap-2 rounded-md bg-white">
        {/* Trunk Section */}
        <div className="flex w-full flex-1 flex-col p-2">
          <h1 className="text-2xl font-semibold text-[#545F71]">Trunk</h1>
          <div className="flex flex-1 gap-1 rounded-md bg-[#F0EFEF] px-2 py-4">
            {trunkImageOrder.map((item, index) => (
              <div key={index} className="flex flex-1 flex-col">
                <h1 className="w-full rounded-t-md bg-[#979797] text-center font-semibold text-white">
                  {item}
                </h1>
                <div className="flex w-full flex-1 justify-center rounded-b-md bg-white">
                  <Image
                    src={trunkImages[item as keyof typeof trunkImages]}
                    alt={item}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Lower Arm Section */}
        <div className="flex w-full flex-1 flex-col p-2">
          <h1 className="text-2xl font-semibold text-[#545F71]">Lower Arm</h1>
          <div className="flex flex-1 gap-1 rounded-md bg-[#F0EFEF] px-2 py-4">
            {Object.entries(lowerArmImages).map(([item, images], index) => (
              <div
                key={index}
                className={`flex ${images.length > 1 ? 'flex-1' : 'flex-2'} flex-col`}
              >
                <h1 className="w-full rounded-t-md bg-[#0161E8] text-center font-semibold text-white">
                  {item}
                </h1>
                <div className="flex w-full flex-1 justify-center rounded-b-md bg-white px-3">
                  {images.map((image, imgIndex) => (
                    <Image
                      key={imgIndex}
                      height={120}
                      src={image}
                      alt={`${item} part ${imgIndex + 1}`}
                      className="object-contain"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Wrist Section */}
        <div className="flex w-full flex-1 flex-col p-2">
          <h1 className="text-2xl font-semibold text-[#545F71]">Wrist</h1>
          <div className="flex flex-1 gap-1 rounded-md bg-[#F0EFEF] px-2 py-4">
            {Object.entries(wristImages).map(([item, images], index) => (
              <div
                key={index}
                className={`flex ${images.length > 1 ? 'flex-1' : 'flex-[2 1 0]'} flex-col`}
              >
                <h1 className="w-full rounded-t-md bg-[#0161E8] text-center font-semibold text-white">
                  {item}
                </h1>
                <div className="flex w-full flex-1 justify-center rounded-b-md bg-white px-2">
                  {images.map((image, imgIndex) => (
                    <Image
                      key={imgIndex}
                      height={100}
                      src={image}
                      alt={`${item} part ${imgIndex + 1}`}
                      className="object-contain"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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
