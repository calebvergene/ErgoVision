'use client'

import first from '@/data/first'
import type { FastAPIResponse } from '@/types/fastapi'
import type { User } from '@/types/users'
import React, { createContext } from 'react'
import CriticalFramesView from './critical-frames-view'

const defaultValues = {
  user: {} as User | null,
  fastapiResponse: first as FastAPIResponse | null,
  //@ts-ignore
  setFastapiResponse: React.Dispatch<
    React.SetStateAction<FastAPIResponse | null>
  >,
  criticalFramesView: null as string | null,
  //@ts-ignore
  setCriticalFramesView: React.Dispatch<React.SetStateAction<string>>,
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
    React.useState<FastAPIResponse | null>(first as FastAPIResponse)
  const [criticalFramesView, setCriticalFramesView] = React.useState<
    string | null
  >(null)

  React.useEffect(() => {
    console.log(criticalFramesView)
  }, [criticalFramesView])

  return (
    <ContentContext.Provider
      value={{
        user,
        fastapiResponse,
        setFastapiResponse,
        criticalFramesView,
        setCriticalFramesView,
      }}
    >
      {criticalFramesView && (
        <CriticalFramesView criticalFramesView={Number(criticalFramesView)} />
      )}
      <div className="flex h-full w-full flex-col gap-1">{children}</div>
    </ContentContext.Provider>
  )
}

export default Content
