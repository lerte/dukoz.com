import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/layouts/Stacked'
import Button from '@/components/Button'

export default function SignUpView() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    const [name, email, password] = e.target
    try {
      setLoading(true)
      const response = await fetch('/api/auth/signUp', {
        method: 'POST',
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value
        })
      })
      const { session, errors } = await response.json()

      if (!response.ok) {
        throw errors
      }

      if (session) {
        router.reload('/meta')
      } else {
        setSuccess(`We sent a verification link to ${email.value}`)
        setError(null)
        setLoading(false)
        name.value = ''
        email.value = ''
        password.value = ''
      }
    } catch (err) {
      setSuccess(null)
      setError(err.items)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl items-center overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <section className="mx-auto w-fit rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <form
            className="flex w-full flex-col gap-2 md:w-96"
            onSubmit={handleSignUp}
          >
            <h1 className="self-start text-3xl font-bold">Create an account</h1>
            {success && (
              <div className="bg-green-500 p-2 text-white">{success}</div>
            )}
            {error?.map(({ message }) => (
              <div
                key={message}
                className="bg-red-600 p-2 text-[13px] text-white"
              >
                <p>{message}</p>
              </div>
            ))}

            <input type="text" placeholder="Type your name" />
            <input type="email" placeholder="Type your email" />
            <input
              autoComplete="new-password"
              type="password"
              placeholder="Type your password"
            />
            <div className="flex justify-between gap-4">
              <Link className="text-indigo-600" href="/sign-in">
                Already have an account?
              </Link>
              <Button loading={loading}>Register</Button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  )
}
