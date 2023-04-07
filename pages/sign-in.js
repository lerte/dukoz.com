'use client'

import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

function SignInView() {
  const router = useRouter()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault()
    const [email, password] = e.target
    try {
      setLoading(true)
      const response = await fetch('/api/auth/signIn', {
        method: 'POST',
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      })
      if (!response.ok) {
        const { errors } = await response.json()
        throw errors
      }
      router.push('/meta')
    } catch (err) {
      setLoading(false)
      setError(err.items)
    }
  }

  return (
    <section className="flex h-96 flex-col items-center justify-center gap-4">
      <form
        className="flex w-full flex-col gap-2 md:w-96"
        onSubmit={handleSignIn}
      >
        <h1 className="self-start text-3xl font-bold">Login to your account</h1>
        {error?.map(({ message }) => (
          <div key={message} className="bg-red-600 p-2 text-[13px] text-white">
            <p>{message}</p>
          </div>
        ))}

        <input type="email" placeholder="Type your email" />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="Type your password"
        />
        <div className="flex justify-between gap-4">
          <Link className="text-indigo-600" href="/sign-up">
            Don't have an account? Register now
          </Link>
          <Button loading={loading}>Login</Button>
        </div>
      </form>
    </section>
  )
}

export default SignInView
