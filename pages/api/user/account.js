import altogic from '@/libs/altogic'

export default async function handler(req, res) {
  // 保存用户的facebook账号信息
  const { _id, userId, userName, userAccessToken } = JSON.parse(req.body)

  const { data, errors } = await altogic.db.model('users.meta').set(
    {
      userId,
      userName,
      userAccessToken
    },
    _id
  )

  if (errors) {
    res.status(errors.status).json({ errors })
  } else {
    res.status(200).json({ data })
  }
}
