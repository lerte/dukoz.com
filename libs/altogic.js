import { createClient } from 'altogic'

const altogic = createClient(process.env.ENV_URL, process.env.CLIENT_KEY, {
  signInRedirect: '/sign-in'
})

export const altogicWithToken = (token) => {
  altogic.auth.setSession({ token })
  return altogic
}

export default altogic
