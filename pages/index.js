import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <Link className="border px-4 py-2 text-xl font-medium" href="/magic-link">
        Login With Magic Link
      </Link>
      <Link className="border px-4 py-2 text-xl font-medium" href="/sign-in">
        登录
      </Link>
      <Link className="border px-4 py-2 text-xl font-medium" href="/sign-up">
        注册
      </Link>
    </div>
  )
}
