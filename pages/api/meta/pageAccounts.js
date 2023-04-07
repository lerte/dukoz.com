export default async function handler(req, res) {
  const { user_id, user_access_token } = req.query
  const response =
    await fetch(`https://graph.facebook.com/${user_id}/accounts?fields=name,access_token&
    access_token=${user_access_token}`)
  const result = await response.json()
  res.status(200).json(result)
}
