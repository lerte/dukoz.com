import { useState, useEffect } from 'react'

export default function Meta() {
  const [info, setInfo] = useState(null)
  const login = () => {
    FB.login((response) => {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ')
        FB.api('/me', (response) => {
          setInfo('欢迎你: ' + response.name)
        })
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    })
  }
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '518242687131507',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v16.0'
      })

      FB.AppEvents.logPageView()
    }
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={login}
        className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        授权登录
      </button>
      <span>{info}</span>
    </>
  )
}
