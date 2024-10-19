import BodyPartCard from './body-part-card'

const BodyPartContainer = () => {
  return (
    <div className="flex-1">
      <h1 className="text-lg font-semibold">By Body Part</h1>
      <div className="rounded-m flex h-32 w-full gap-2 rounded-md bg-white">
        {[0, 0, 0].map((_, index) => (
          <BodyPartCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default BodyPartContainer
