import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { Button } from '../components/button'
import { Container } from '../components/container'
import { Gradient } from '../components/gradient'
import { Link } from '../components/link'
import { Navbar } from '../components/navbar'

export const metadata: Metadata = {
  description:
    'Prevent workplace injuries with AI-powered ergonomic safety assessments.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/dashboard"
              className="flex items-center gap-1 rounded-full bg-[#1f92af]/60 px-3 py-0.5 text-sm/6 font-medium text-white transition-all duration-300 data-[hover]:bg-[#1f92af]/80"
            >
              See how Radiant uses computer vision to prevent future workplace
              injuries.
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Safety, you can see.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Prevent workplace injuries with AI-powered ergonomic safety
            assessments.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="#">Get started</Button>
            <Button variant="secondary" href="/dashboard">
              Access Dashboard
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default function Home() {
  return <Hero />
}
