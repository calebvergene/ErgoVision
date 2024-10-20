import Content from '@/components/dashboard/content'
import VideoWrapper from '@/components/dashboard/live-stream'
import MskRiskContainer from '@/components/dashboard/msk/msk-risk-container'
import SummaryAndBodyPart from '@/components/dashboard/summary/summary'
import TopBar from '@/components/dashboard/topbar'
import { getUserInfo } from '@/lib/get-user-info'

const page = async () => {
  const user = await getUserInfo()
  return (
    <Content user={user}>
      <TopBar />
      <div className="flex h-5/6 w-full flex-1 gap-1">
        <div className="flex w-1/2 flex-col py-4" id="video">
          <VideoWrapper />
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
