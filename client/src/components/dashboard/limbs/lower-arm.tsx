import Image from 'next/image'

import zeroToSixtyDegLowerArm from '@/../public/dashboard/lowerarm/0-60.png'
import zeroDegLowerArm from '@/../public/dashboard/lowerarm/0.png'
import hundredDegLowerArm from '@/../public/dashboard/lowerarm/100.png'

const lowerArmImages = {
  '0°': [zeroDegLowerArm],
  '0-60° & 100°': [zeroToSixtyDegLowerArm, hundredDegLowerArm],
}

const lowerArmRange = {
  '0°': [0],
  '0-60° & 100°': [0, 60, 100, 149], // Updated to include 149
}

const getBackgroundColor = (degree: number, range: string) => {
  const [start, end, ...extras] =
    lowerArmRange[range as keyof typeof lowerArmRange]
  if (end) {
    return (degree >= start && degree <= end) ||
      extras.some((extra) => Math.abs(degree - extra) < 0.01)
      ? 'bg-[#0161E8]'
      : 'bg-[#0161E8]'
  }
  return 'bg-[#b9b9b9]'
}

const lowerArmImageOrder = ['0°', '0-60° & 100°']

const LowerArm = ({ degree = 0 }: { degree?: number }) => {
  let activeRange = lowerArmImageOrder.find((range) => {
    const [start, end, ...extras] =
      lowerArmRange[range as keyof typeof lowerArmRange]
    return end
      ? (degree >= start && degree <= end) ||
          extras.some((extra) => Math.abs(degree - extra) < 0.01)
      : Math.abs(degree - start) < 0.01
  })

  // Default to '0-60° & 100°' if no active range is found
  if (!activeRange) {
    activeRange = '0-60° & 100°'
  }

  return (
    <div className="flex w-full flex-1 flex-col p-2">
      <h1 className="text-2xl font-semibold text-[#545F71]">Lower Arm</h1>
      <div className="flex flex-1 gap-1 rounded-md bg-[#F0EFEF] px-2 py-4">
        {lowerArmImageOrder.map((item, index) => (
          <div key={index} className="flex flex-1 flex-col">
            <h1
              className={`w-full rounded-t-md text-center font-semibold text-white ${getBackgroundColor(degree, item)} ')}`}
            >
              {item}
            </h1>
            <div className="flex w-full flex-1 justify-center gap-x-8 rounded-b-md bg-white">
              {lowerArmImages[item as keyof typeof lowerArmImages].map(
                (image, imgIndex) => (
                  <Image
                    key={imgIndex}
                    height={120}
                    src={image}
                    alt={`${item} part ${imgIndex + 1}`}
                    className="object-contain"
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LowerArm
