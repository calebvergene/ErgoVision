import Image from 'next/image'

import zeroToSixtyDegLowerArm from '@/../public/dashboard/lowerarm/0-60.png'
import zeroDegLowerArm from '@/../public/dashboard/lowerarm/0.png'
import hundredDegLowerArm from '@/../public/dashboard/lowerarm/100.png'

const lowerArmImages = {
  '0°': [zeroDegLowerArm],
  '0-60° & 100°': [zeroToSixtyDegLowerArm, hundredDegLowerArm],
}

const LowerArm = () => (
  <div className="flex w-full flex-1 flex-col p-2">
    <h1 className="text-2xl font-semibold text-[#545F71]">Lower Arm</h1>
    <div className="flex flex-1 gap-1 rounded-md bg-[#F0EFEF] px-2 py-4">
      <div className="flex w-[25%] flex-col">
        <h1 className="w-full rounded-t-md bg-[#979797] text-center font-semibold text-white">
          0°
        </h1>
        <div className="flex w-full flex-1 justify-center gap-x-8 rounded-b-md bg-white">
          {lowerArmImages['0°'].map((image, imgIndex) => (
            <Image
              key={imgIndex}
              height={120}
              src={image}
              alt={`0° part ${imgIndex + 1}`}
              className="object-contain"
            />
          ))}
        </div>
      </div>
      <div className="flex w-[75%] flex-col">
        <h1 className="w-full rounded-t-md bg-[#0161E8] text-center font-semibold text-white">
          '0-60° & 100°'
        </h1>
        <div className="flex w-full flex-1 justify-center gap-x-8 rounded-b-md bg-white">
          {lowerArmImages['0-60° & 100°'].map((image, imgIndex) => (
            <Image
              key={imgIndex}
              height={120}
              src={image}
              alt={`0-60° & 100° part ${imgIndex + 1}`}
              className="object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default LowerArm
