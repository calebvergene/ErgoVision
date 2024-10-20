import Top from '@/../public/dashboard/Vector 151.png'
import Middle from '@/../public/dashboard/Vector 152.png'
import Bottom from '@/../public/dashboard/Vector 153.png'
import Image from 'next/image'
import BodyPartContainer from '../body-part-container'
import ProgressIndicator from './progress-indicator'

const Summary = () => {
  return (
    <div className="bg-white py-3">
      <h1 className="px-3 text-lg font-semibold text-[#074d55]">Summary</h1>
      <div className="relative flex h-32 w-full items-center justify-center rounded-md">
        <Image src={Top} alt="Frame 1" className="absolute inset-0 m-auto" />
        <Image src={Middle} alt="Frame 1" className="absolute inset-0 m-auto" />
        <Image src={Bottom} alt="Frame 1" className="absolute inset-0 m-auto" />
        <ProgressIndicator />
      </div>
      <div className="px-3 text-[#545F71]">
        <h3 className="text-base font-semibold">REBA Score</h3>
        <p className="text-sm">Based on overall position.</p>
      </div>

      <BodyPartContainer />
    </div>
  )
}

export default Summary
