import BodyPartCard from './body-part-card'

const BodyPartContainer = () => {
  return (
    <div className="mt-4 flex-1 px-3">
      <div className="rounded-m flex h-32 w-full gap-2 rounded-md bg-white">
        {[0, 0, 0].map((_, index) => (
          <BodyPartCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default BodyPartContainer
