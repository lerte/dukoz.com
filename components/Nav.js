import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Nav({ user }) {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  const signOut = async () => {
    const response = await fetch(`/api/auth/signOut`)
    const { data } = await response.json()
    if (data) {
      router.reload('/')
    }
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link href="/" className="ml-2 flex md:mr-24">
              <img src="/logo.svg" className="mr-3 h-8" alt="Dukoz Logo" />
            </Link>
          </div>
          {user?.name && (
            <div className="flex items-center">
              <div className="ml-3 flex items-center">
                <div>
                  <button
                    type="button"
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <picture className="h-8 w-8 overflow-hidden rounded-full border">
                      <img
                        className="h-full w-full object-cover"
                        src={
                          user?.profilePicture ||
                          `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`
                        }
                        alt={user?.name}
                      />
                    </picture>
                  </button>
                </div>
                <div
                  id="dropdown-user"
                  className={`${
                    showMenu
                      ? 'translate absolute right-4 top-14 block'
                      : 'hidden'
                  } z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700`}
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {user?.name}
                    </p>
                    <p
                      className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
                      role="none"
                    >
                      {user?.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={signOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
