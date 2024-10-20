import Image from 'next/image'

import zeroDegWrist from '@/../public/dashboard/wrist/15.png'
import thirtyDegreeWrist from '@/../public/dashboard/wrist/15down.png'
import fortyFiveDegreeWrist from '@/../public/dashboard/wrist/15up.png'

const wristImages = {
  '15°': [zeroDegWrist],
  '15° up & down': [thirtyDegreeWrist, fortyFiveDegreeWrist],
}

const Wrist = () => (
  <div className="flex w-full flex-1 flex-col p-2">
    <h1 className="text-2xl font-semibold text-[#545F71]">Wrist</h1>
    <div className="flex flex-1 gap-1 rounded-md bg-[#F0EFEF] px-2 py-4">
      <div className="flex w-[25%] flex-col">
        <h1 className="w-full rounded-t-md bg-[#979797] text-center font-semibold text-white">
          15°
        </h1>
        <div className="flex w-full flex-1 justify-center gap-x-8 rounded-b-md bg-white">
          {wristImages['15°'].map((image, imgIndex) => (
            <Image
              key={imgIndex}
              height={120}
              src={image}
              alt={`15° part ${imgIndex + 1}`}
              className="object-contain"
            />
          ))}
        </div>
      </div>
      <div className="flex w-[75%] flex-col">
        <h1 className="w-full rounded-t-md bg-[#0161E8] text-center font-semibold text-white">
          15° up & down
        </h1>
        <div className="flex w-full flex-1 justify-center gap-x-8 rounded-b-md bg-white">
          {wristImages['15° up & down'].map((image, imgIndex) => (
            <Image
              key={imgIndex}
              height={120}
              src={image}
              alt={`15° up & down part ${imgIndex + 1}`}
              className="object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default Wrist
