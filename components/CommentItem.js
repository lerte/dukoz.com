import dayjs from 'dayjs'

export default function CommentItem({ comments, currentPage }) {
  return (
    <>
      <ul className="border-t-2 border-gray-300">
        {comments?.data.map((comment) => (
          <li
            key={comment.id}
            className="mb-2 flex flex-wrap items-center py-2 px-4"
          >
            <img
              alt={comment.from.name}
              src={`/api/meta/picture?userID=${comment.from.id}&accessToken=${currentPage.access_token}`}
              className="mr-2 h-8 w-8 rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-800">
                {comment.from.name}
              </div>
              <div className="text-sm text-gray-600">{comment.message}</div>
            </div>
            <div className="text-sm text-gray-500">
              {dayjs(comment.created_time).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className="w-full">
              <CommentItem
                comments={comment?.comments}
                currentPage={currentPage}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
