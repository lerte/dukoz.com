import altogic from '@/libs/altogic'

export default async function handler(req, res) {
  const { access_token } = JSON.parse(req.body)

  const { user, session, errors } = await altogic.auth.getAuthGrant(
    access_token
  )

  if (errors) {
    res.status(errors.status).json({ errors })
  } else {
    altogic.auth.setSessionCookie(session.token, req, res)
    altogic.auth.setSession(session)
    res.status(200).json({ user, session })
  }
}
