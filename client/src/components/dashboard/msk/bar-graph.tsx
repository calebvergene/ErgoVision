interface BarGraphProps {
  title: string
}

const BarGraph = ({ title }: BarGraphProps) => {
  const scores = [10, 80, 10]
  const colors = ['#22A26E', '#FF822E', '#F14F28']
  return (
    <>
      <div className="h-fit w-full rounded-md bg-white px-1 pb-4 pt-1 capitalize">
        {title} Score
        <div className="flex h-10 w-full gap-x-1">
          {scores.map((score, index) =>
            score > 0 ? (
              <div
                key={index}
                className="flex h-full items-center justify-center rounded-md font-bold text-white"
                style={{ width: `${score}%`, backgroundColor: colors[index] }}
              >
                {score > 10 ? `${score}%` : ''}
              </div>
            ) : null,
          )}
        </div>
      </div>
    </>
  )
}

export default BarGraph
