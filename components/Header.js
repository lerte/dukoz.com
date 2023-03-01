import Logo from '@/components/Logo'
import { useState } from 'react'

export default function Header() {
  const [show, setShow] = useState(false)
  const menus = ['Home', 'Products']
  return (
    <header class="backdrop-blur z-10 sticky top-0 shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-4">
        <div className="h-14 flex justify-between py-0.5 items-center md:justify-start md:space-x-10">
          <div className="flex justify-start items-center">
            <a
              href="/"
              className="flex items-center hover:scale-105 ease-in-out duration-300"
            >
              <span className="sr-only">Dukoz</span>
              <Logo />
              <div className="flex items-center">
                <p className="ml-2 text-sm">Dukoz</p>
              </div>
            </a>
          </div>
          <nav className="hidden md:flex md:space-x-2 lg:space-x-6 justify-center text-sm">
            {menus.map((menu) => (
              <a href="/" className="hover:text-primary">
                {menu}
              </a>
            ))}
          </nav>
          <div
            className="md:hidden hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
            onClick={() => setShow((show) => !show)}
          >
            <div className="w-9 h-1 my-3 bg-black transition-transform ease-in-out duration-300"></div>
            <div className="w-9 h-1 my-3 bg-black transition-transform ease-in-out duration-300"></div>
          </div>
        </div>
      </div>
      <div
        className={
          show ? 'bg-white shadow-inner block' : 'bg-white shadow-md hidden'
        }
      >
        <nav className="text-sm p-4 grid grid-cols-1 gap-4">
          {menus.map((menu) => (
            <a href="/" className="text-black hover:text-primary">
              {menu}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
