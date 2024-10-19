'use client'

import {
  CalendarIcon,
  ChartBarIcon,
  ChevronRightIcon,
  RectangleStackIcon,
  UsersIcon,
} from '@heroicons/react/16/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const color = 'bg-[#F5F5F5]'
const textColor = '#545F71'

const tabs = [
  { Icon: RectangleStackIcon, title: 'Dashboard', href: '/dashboard' },
  {
    Icon: CalendarIcon,
    title: 'New Video',
    href: '/dashboard',
  },
  { Icon: UsersIcon, title: 'Users', href: '/dashboard/users' },
  { Icon: ChartBarIcon, title: 'Statistics', href: '/dashboard/statistics' },
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
      className={`flex h-14 mt-1 w-full items-center text-[${textColor}] rounded-md px-4 data-[active=true]:bg-[#e6e9eb] hover:bg-[#e6e9eb] duration-200`}
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
    <div className={`${color} h-full w-full rounded-md px-4 py-4`}>
      <Navigation />
    </div>
  )
}

export default Sidebar
