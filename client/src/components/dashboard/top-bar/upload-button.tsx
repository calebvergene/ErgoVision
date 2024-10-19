import { PlusCircleIcon } from '@heroicons/react/24/outline'

const UploadButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="flex rounded-md bg-[#0161E8] px-4 py-3 text-white"
    >
      <PlusCircleIcon className="mr-2 h-6 w-6 stroke-2" />
      <span className="font-semibold">Upload Video</span>
    </button>
  )
}

export default UploadButton
