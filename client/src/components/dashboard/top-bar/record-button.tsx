import Link from "next/link"

const RecordButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Link href="../live" passHref>

    <button
      {...props}
      className="flex rounded-3xl border-2 border-[#085E69] px-4 py-[.6rem] mr-2 text-[#085E69] "
    >
      <span className="font-medium">Record Video</span>
    </button>

    </Link>
  )
}

export default RecordButton
