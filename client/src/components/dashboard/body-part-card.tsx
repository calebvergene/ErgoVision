interface BodyPartCardProps {
  bodyPart: string
}
const BodyPartCard = ({ bodyPart }: BodyPartCardProps) => {
  return (
    <div className="h-full flex-1 rounded-md bg-[#F3F3F3] px-3 py-2">
      <h1 className="font-semibold capitalize">{bodyPart}</h1>
    </div>
  )
}

export default BodyPartCard
