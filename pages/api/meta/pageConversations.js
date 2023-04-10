export default async function handler(req, res) {
  const { pageId, accessToken } = req.query
  const response = await fetch(
    `https://graph.facebook.com/${pageId}/conversations?fields=message_count,unread_count,updated_time,messages{message,created_time,tags}&access_token=${accessToken}`
  )
  const result = await response.json()
  res.status(200).json(result)
}
