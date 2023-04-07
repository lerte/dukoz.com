export default async function handler(req, res) {
  const fb_exchange_token = req.fb_exchange_token
  const { APP_ID, APP_SECRET } = process.env
  const response =
    await fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&
  client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${fb_exchange_token}`)
  const result = await response.json()
  res.status(200).json(result)
}
