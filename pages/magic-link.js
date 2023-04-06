'use client'

import Link from 'next/link'
import { useState } from 'react'
import altogic from '@/libs/altogic'

function MagicLinkView() {
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  async function loginHandler(e) {
    e.preventDefault()
    const [email] = e.target
    setLoading(true)
    setErrors(null)

    const { errors: apiErrors } = await altogic.auth.sendMagicLinkEmail(
      email.value
    )
    setLoading(false)

    if (apiErrors) {
      setErrors(apiErrors.items)
    } else {
      email.value = ''
      setSuccess('Email sent! Check your inbox.')
    }
  }

  return (
    <section className="flex h-96 flex-col items-center justify-center gap-4">
      <form
        className="flex w-full flex-col gap-2 md:w-96"
        onSubmit={loginHandler}
      >
        <h1 className="self-start text-3xl font-bold">Login with magic link</h1>
        {success && (
          <div className="bg-green-600 p-2 text-[13px] text-white">
            {success}
          </div>
        )}
        {errors && (
          <div className="bg-red-600 p-2 text-[13px] text-white">
            {errors.map(({ message }) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        )}

        <input type="email" placeholder="Type your email" />
        <div className="flex justify-between gap-4">
          <Link className="text-indigo-600" href="/sign-up">
            Don't have an account? Register now
          </Link>
          <button
            disabled={loading}
            type="submit"
            className="shrink-0 border border-gray-500 py-2 px-3 transition hover:bg-gray-500 hover:text-white"
          >
            Send magic link
          </button>
        </div>
      </form>
    </section>
  )
}

export default MagicLinkView
