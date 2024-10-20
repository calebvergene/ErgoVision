import AiTips from '@/components/dashboard/ai-tips'
import Content from '@/components/dashboard/content'
import MskRiskContainer from '@/components/dashboard/msk/msk-risk-container'
import CriticalFrames from '@/components/dashboard/summary/critical-frames'
import SummaryAndBodyPart from '@/components/dashboard/summary/summary'
import TopBar from '@/components/dashboard/topbar'
import Video from '@/components/dashboard/video'
import { getUserInfo } from '@/lib/get-user-info'

const page = async () => {
  const user = await getUserInfo()
  return (
    <Content user={user}>
      <TopBar />
      <div className="flex h-5/6 w-full flex-1 gap-1">
        <div className="flex w-1/2 flex-col gap-1 py-4" id="video">
          <Video />
          <h1 className="w-full px-3 text-lg font-semibold">Critical Frames</h1>
          <CriticalFrames />
          <AiTips />
        </div>
        <div className="flex w-1/2 flex-col gap-1 rounded-md bg-[#F5F5F5] p-4 text-[#545F71]">
          <SummaryAndBodyPart />

          <h1 className="text-lg font-semibold">% of Video by MSD Risk</h1>
          <MskRiskContainer />
        </div>
      </div>
    </Content>
  )
}

export default page
