interface BodyPartCardProps {
  bodyPart: string
  score: number
}
const BodyPartCard = ({ bodyPart, score }: BodyPartCardProps) => {
  const status: 'Good' | 'Fair' | 'Poor' =
    score > 5 ? 'Poor' : score > 3 ? 'Fair' : 'Good'

  // Define colors based on status
  const statusColors = {
    Good: {
      background: 'bg-[#0b808d]/70',
      text: 'text-white',
    },
    Fair: {
      background: 'bg-[#085E68]/90',
      text: 'text-white',
    },
    Poor: {
      background: 'bg-[#074d55]',
      text: 'text-white',
    },
  }

  return (
    <div className="flex min-h-[155px] min-w-[171px] flex-1 flex-col space-y-2 rounded-md bg-[#F3F3F3]">
      <h1 className="px-4 pt-2 font-semibold capitalize">{bodyPart}</h1>
      <div className="relative flex items-center justify-center">
        <div className={`aspect-square w-11/12 rounded-full bg-white`}></div>
        <div className="absolute bottom-0 right-0">
          <div
            className={`flex aspect-square h-10 w-10 items-center justify-center rounded-full p-2 text-sm ${statusColors[status].text} ${statusColors[status].background}`}
          >
            <p className="text-lg font-bold">{score}</p>
          </div>
        </div>
      </div>
      <div id="footer" className="rounded-b-md bg-[#8D8D8D] px-4 py-1">
        <p className={`text-center text-base text-white`}>{status}</p>
      </div>
    </div>
  )
}

export default BodyPartCard
