import Layout from '@/layouts/Sidebar'
import { useState, useEffect } from 'react'
import FacebookPage from '@/components/FacebookPage'

export default function Dashboard() {
  const [loginInfo, setLoginInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [accounts, setAccounts] = useState([
    {
      name: 'Crephy Cosmetics',
      cover: {
        cover_id: '454722196680070',
        offset_x: 50,
        offset_y: 52,
        source:
          'https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/301923488_454722190013404_6995452967497965842_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1091cb&_nc_ohc=lt6_yM-vKBwAX-glyGg&_nc_ht=scontent-iad3-1.xx&edm=AGaHXAAEAAAA&oh=00_AfCRTe-Xlie68nToJj0vXDEPTbvtpdSU4_PxGBDllkPCTA&oe=6436946C',
        id: '454722196680070'
      },
      fan_count: 241,
      followers_count: 1446,
      access_token:
        'EAAHXVsdGH3MBAKRcr0FZCsl2eYDuhoa6bGTBvc6gvwVpKzSvmjWQprdfdFU7C7TZCBOQLyq14q5LdHZC9OK4PLWO3xYqWiDgxUsyWesrsckZBVkC5OTSSH74CkEGI5h92ZBDa6PZCsyQIIK8wrfX1Y4P3dZBLaVdAEfBP8cM74CcvliQ2wTo9uZC97FZAqNCTqEy8UCvtDA4ZAlVejWUhiTRI9y9YChq1dvSUZD',
      id: '115401993623951'
    },
    {
      name: 'Lerte Page',
      fan_count: 0,
      followers_count: 0,
      access_token:
        'EAAHXVsdGH3MBAM0GVDqK69KqIlJYhbgv3iGJATPyV1hlO8Ug5XdrSZBaC9Jjpb3zhtNVhIH366eh0L1ETT9BqmP84211ujfPfDSv8fhOI6e43cjtseEMYuDfcb1PYd04Lh31JCpU5lziicBJIz5T3yKF9wtimXQOYCqHZAodiJiVugB4Q8lsEZBsFDDL8fBU9y64F11ImZBj5oacAJwnj6Nu9uQi9CcZD',
      id: '1535755520084851'
    }
  ])

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
    ;(function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }, [])

  const login = () => {
    FB.login((response) => {
      setLoginInfo(response)
      if (response.authResponse) {
        FB.api('/me', (response) => {
          setUserInfo(response)
        })
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    })
  }

  const getPages = async () => {
    // 获取您的公共主页编号
    const params = new URLSearchParams({
      userID: loginInfo.authResponse.userID,
      accessToken: loginInfo.authResponse.accessToken
    })
    const response = await fetch(`/api/meta/pageAccounts?${params}`)
    const { data } = await response.json()
    setAccounts(data)
  }

  return (
    <Layout>
      <button
        type="button"
        onClick={login}
        className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        授权登录
      </button>
      {userInfo.id ? (
        <button
          type="button"
          onClick={getPages}
          className="mr-2 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          获取公共主页
        </button>
      ) : (
        ''
      )}
      <section className="grid grid-cols-1 space-y-12 pt-9 md:grid-cols-2 md:gap-6 md:gap-x-6 md:space-y-0 lg:grid-cols-3">
        {accounts.map((account) => (
          <FacebookPage key={account.id} account={account} />
        ))}
      </section>
    </Layout>
  )
}
