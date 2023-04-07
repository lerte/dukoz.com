export default async function handler(req, res) {
  const { userID, accessToken } = req.query
  const response =
    await fetch(`https://graph.facebook.com/${userID}/accounts?fields=name,access_token&
    access_token=${accessToken}`)
  const result = await response.json()
  res.status(200).json(result)
}
