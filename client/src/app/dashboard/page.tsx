import AiTips from '@/components/dashboard/ai-tips'
import BodyPartContainer from '@/components/dashboard/body-part-container'
import Content from '@/components/dashboard/content'
import TopBar from '@/components/dashboard/topbar'
import Video from '@/components/dashboard/video'
import { getUserInfo } from '@/utils/get-user-info'

const page = async () => {
  const user = await getUserInfo()
  return (
    <Content user={user}>
      <TopBar />
      <div className="flex h-5/6 w-full gap-1">
        <div className="flex w-1/2 flex-col gap-1" id="video">
          <Video />
          <AiTips />
        </div>
        <div className="h-full w-1/2 rounded-md bg-[#F5F5F5] p-4 text-[#545F71]">
          <h1 className="text-lg font-semibold">Summary</h1>
          <div className="rounded-m h-32 w-full rounded-md bg-[#E5E5E5]" />
          <BodyPartContainer />
          <h1 className="text-lg font-semibold">% of Video by MSD Risk</h1>
          <div className="rounded-m h-32 w-full rounded-md bg-[#E5E5E5]" />
        </div>
      </div>
    </Content>
  )
}

export default page
