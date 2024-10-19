'use client'

import type { User } from '@/types/users'
import { createContext } from 'react'

const defaultValues = {
  user: {} as User | null,
}
export const ContentContext = createContext(defaultValues)
const Content = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) => {
  return (
    <ContentContext.Provider value={{ user }}>
      <div className="flex h-full w-full flex-col gap-1">{children}</div>
    </ContentContext.Provider>
  )
}

export default Content
