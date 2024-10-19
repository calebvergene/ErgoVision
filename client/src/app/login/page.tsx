import Form from '@/components/login/form'
import type { Metadata } from 'next'
import { GradientBackground } from '../../components/gradient'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account to continue.',
}

export default async function Login() {
  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <Form />
        </div>
      </div>
    </main>
  )
}
