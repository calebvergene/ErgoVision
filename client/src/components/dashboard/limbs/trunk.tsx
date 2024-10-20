import Image from 'next/image'

import zeroToSixtyDeg from '@/../public/dashboard/trunk/0-20.png'
import zeroDeg from '@/../public/dashboard/trunk/0.png'
import twentyToSixtyDeg from '@/../public/dashboard/trunk/20-60.png'
import sixtyDegForward from '@/../public/dashboard/trunk/60.png'

const trunkImages = {
  '0°': zeroDeg,
  '0-20°': zeroToSixtyDeg,
  '20-60°': twentyToSixtyDeg,
  '60°': sixtyDegForward,
}

const trunkImageOrder = ['0°', '0-20°', '20-60°', '60°']

const Trunk = () => (
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
)

export default Trunk
