import { ChevronRightIcon } from '@heroicons/react/16/solid'

const AiTips = () => {
  return (
    <div className="w-full flex-1 rounded-md bg-[#F5F5F5] p-4">
      <div className="flex h-fit w-full items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">AI Tips:</h2>
          <p className="text-sm">4 suggested tips</p>
        </div>
        <ChevronRightIcon className="h-8 w-8 rounded-full bg-[#E5E5E5] fill-white stroke-2 p-1" />
      </div>
    </div>
  )
}

export default AiTips
