'use client'

import {
  ChevronRightIcon,
  RectangleStackIcon,
  VideoCameraIcon,
} from '@heroicons/react/16/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const color = 'bg-white'
const textColor = '#545F71'

const tabs = [
  { Icon: RectangleStackIcon, title: 'Dashboard', href: '/dashboard' },
  {
    Icon: VideoCameraIcon,
    title: 'Demo Video',
    href: '/dashboard/your-videos',
  },
  {
    Icon: VideoCameraIcon,
    title: 'Live',
    href: '/dashboard/live',
  },
]

const Tab = ({
  Icon,
  title,
  href,
  isActive,
}: {
  Icon: React.ElementType
  title: string
  href: string
  isActive: boolean
}) => {
  return (
    <Link
      href={href}
      data-active={isActive || false}
      className={`mt-1 flex h-14 w-full items-center text-[${textColor}] rounded-3xl px-4 duration-200 hover:bg-[#e6e9eb] data-[active=true]:bg-[#085E69]/90 data-[active=true]:text-white`}
    >
      <Icon className={`mr-1 h-auto w-6`} />
      <span>{title}</span>
      <ChevronRightIcon className="ml-auto h-6 w-6 fill-[#9BA5B7]" />
    </Link>
  )
}

const Navigation = () => {
  const pathname = usePathname()
  return (
    <div className="flex flex-col">
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.href
        return <Tab key={tab.title} {...tab} isActive={isActive} />
      })}
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className={`${color} h-full w-full rounded-xl px-4 py-4`}>
      <Navigation />
    </div>
  )
}

export default Sidebar
