import altogic from '@/libs/altogic'

export default async function handler(req, res) {
  // 保存用户的facebook page 信息
  const { _id, pages } = JSON.parse(req.body)

  await altogic.db
    .model('users.meta.page')
    .filter(`_parent == "${_id}"`)
    .delete()

  const { data, errors } = await altogic.db
    .model('users.meta.page')
    .append(pages, _id)

  if (errors) {
    res.status(errors.status).json({ errors })
  } else {
    res.status(200).json({ data })
  }
}
