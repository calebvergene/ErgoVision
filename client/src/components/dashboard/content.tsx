'use client'

import type { FastAPIResponse } from '@/types/fastapi'
import type { User } from '@/types/users'
import React, { createContext } from 'react'

const defaultValues = {
  user: {} as User | null,
  fastapiResponse: {} as FastAPIResponse | null,
  //@ts-ignore
  setFastapiResponse: React.Dispatch<
    React.SetStateAction<FastAPIResponse | null>
  >,
}
export const ContentContext = createContext(defaultValues)
const Content = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) => {
  const [fastapiResponse, setFastapiResponse] =
    React.useState<FastAPIResponse | null>(null)

  React.useEffect(() => {
    console.log(fastapiResponse)
  }, [fastapiResponse])

  return (
    <ContentContext.Provider
      value={{ user, fastapiResponse, setFastapiResponse }}
    >
      <div className="flex h-full w-full flex-col gap-1">{children}</div>
    </ContentContext.Provider>
  )
}

export default Content
