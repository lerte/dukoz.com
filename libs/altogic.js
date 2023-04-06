import { createClient } from 'altogic'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { ENV_URL, CLIENT_KEY } = publicRuntimeConfig

const altogic = createClient(ENV_URL, CLIENT_KEY, {
  signInRedirect: '/sign-in'
})

export const altogicWithToken = (token) => {
  altogic.auth.setSession({ token })
  return altogic
}

export default altogic
