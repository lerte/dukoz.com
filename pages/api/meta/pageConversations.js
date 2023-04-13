const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v16.0'

export default async function handler(req, res) {
  const { pageId, accessToken } = req.query
  const response = await fetch(
    `${FACEBOOK_GRAPH_URL}/${pageId}/conversations?fields=message_count,unread_count,updated_time,messages{message,created_time,tags,from}&access_token=${accessToken}`
  )
  const result = await response.json()
  res.status(200).json(result)
}
