import Image from 'next/image'

import zeroDegWrist from '@/../public/dashboard/wrist/15.png'
import thirtyDegreeWrist from '@/../public/dashboard/wrist/15down.png'
import fortyFiveDegreeWrist from '@/../public/dashboard/wrist/15up.png'

const wristRange = {
  '15°': [15],
  '15° up & down': [0, 15, 15, 100],
}

const wristImages = {
  '15°': [zeroDegWrist],
  '15° up & down': [thirtyDegreeWrist, fortyFiveDegreeWrist],
}

const getBackgroundColor = (degree: number, range: string) => {
  const [start, end] = wristRange[range as keyof typeof wristRange]
  if (end) {
    return degree >= start && degree <= end ? 'bg-[#0161E8]' : ''
  }
  return degree === start ? 'bg-[#0161E8]' : ''
}

const wristImageOrder = ['15°', '15° up & down']

const Wrist = ({ degree = 15 }: { degree?: number }) => {
  const activeRange =
    wristImageOrder.find((range) => {
      const [start, end] = wristRange[range as keyof typeof wristRange]
      return end ? degree >= start && degree <= end : degree === start
    }) || '15°'

  return (
    <div className="flex w-full flex-1 flex-col p-2">
      <h1 className="text-2xl font-semibold text-[#545F71]">Wrist</h1>
      <div className="flex flex-1 gap-1 rounded-md bg-[#F0EFEF] px-2 py-4">
        {wristImageOrder.map((item, index) => (
          <div key={index} className="flex flex-1 flex-col">
            <h1
              className={`w-full rounded-t-md text-center font-semibold text-white ${getBackgroundColor(degree, item) || (item === activeRange ? 'bg-blue-400' : 'bg-[#979797]')}`}
            >
              {item}
            </h1>
            <div className="flex w-full flex-1 justify-center gap-x-8 rounded-b-md bg-white">
              {wristImages[item as keyof typeof wristImages].map(
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

export default Wrist
