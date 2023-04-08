import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/layouts/Stacked'
import Button from '@/components/Button'

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
      router.replace('/meta')
    } catch (err) {
      setLoading(false)
      setError(err.items)
    }
  }

  return (
    <Layout>
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl items-center overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <section className="mx-auto w-fit rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <form
            className="flex w-full flex-col gap-2 md:w-96"
            onSubmit={handleSignIn}
          >
            <h1 className="self-start text-3xl font-bold">
              Login to your account
            </h1>
            {error?.map(({ message }) => (
              <div
                key={message}
                className="bg-red-600 p-2 text-[13px] text-white"
              >
                <p>{message}</p>
              </div>
            ))}

            <input type="email" placeholder="Type your email" />
            <input type="password" placeholder="Type your password" />
            <div className="flex justify-between gap-4">
              <Link className="text-indigo-600" href="/sign-up">
                Don't have an account? Register now
              </Link>
              <Button loading={loading}>Login</Button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  )
}

export default SignInView
