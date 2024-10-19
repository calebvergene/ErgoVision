'use client'
import { Field, Input, Label } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../../components/button'
import { Link } from '../../components/link'
import { Mark } from '../../components/logo'
const Form = () => {
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      company: formData.get('company'),
      industry: formData.get('industry'),
    }
    const response = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      router.push('/dashboard')
    } else {
      console.log('Error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-7 sm:p-11">
      <div className="flex items-start">
        <Link href="/" title="Home">
          <Mark className="h-9 fill-black" />
        </Link>
      </div>
      <h1 className="mt-8 text-base/6 font-medium">Welcome!</h1>
      <p className="mt-1 text-sm/5 text-gray-600">
        Enter the following information to continue.
      </p>
      <Field className="mt-4 space-y-3">
        <Label className="text-sm/5 font-medium">First Name</Label>
        <Input
          required
          autoFocus
          type="text"
          name="first-name"
          className={clsx(
            'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
            'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
            'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
          )}
        />
      </Field>
      <Field className="mt-4 space-y-3">
        <Label className="text-sm/5 font-medium">Last Name</Label>
        <Input
          required
          type="text"
          name="last-name"
          className={clsx(
            'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
            'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
            'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
          )}
        />
      </Field>
      <Field className="mt-4 space-y-3">
        <Label className="text-sm/5 font-medium">Company</Label>
        <Input
          required
          type="text"
          name="company"
          className={clsx(
            'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
            'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
            'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
          )}
        />
      </Field>
      <Field className="mt-4 space-y-3">
        <Label className="text-sm/5 font-medium">Industry</Label>
        <Input
          required
          type="text"
          name="industry"
          className={clsx(
            'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
            'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
            'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
          )}
        />
      </Field>

      <div className="mt-8">
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </div>
    </form>
  )
}

export default Form
