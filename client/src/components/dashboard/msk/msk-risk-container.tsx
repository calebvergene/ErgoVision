import BarGraph from './bar-graph'

const MskRiskContainer = () => {
  return (
    <div className="flex-0 flex flex-col gap-1">
      <BarGraph title="Overall Assessment" />
      <div className="grid w-full flex-1 grid-cols-2 grid-rows-2 gap-1">
        <BarGraph title="Trunk" />
        <BarGraph title="Upper Arm" />
        <BarGraph title="Lower Arm" />
        <BarGraph title="Neck" />
      </div>
    </div>
  )
}

export default MskRiskContainer
