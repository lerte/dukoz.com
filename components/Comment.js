import dayjs from 'dayjs'
import CommentItem from './CommentItem'

export default function Comment({ currentPage, currentPost }) {
  return (
    <div className="flex h-full max-h-screen flex-col">
      <div className="flex px-2 py-4">
        <img
          alt={currentPage.name}
          src={`/api/meta/picture?userID=${currentPage.id}&accessToken=${currentPage.access_token}`}
          className="mr-2 h-8 w-8 rounded-full"
        />
        <div className="text-sm leading-5 text-gray-500">
          <p>{currentPost.message}</p>
          <p>
            {`0个心情.${currentPost.comments?.data.length || 0}条评论.${dayjs(
              currentPost.created_time
            ).format('YYYY-MM-DD HH:mm:ss')}`}
          </p>
          <img
            alt=""
            src={`/api/proxy?url=${encodeURIComponent(
              currentPost.full_picture
            )}`}
          />
        </div>
      </div>
      <CommentItem comments={currentPost.comments} currentPage={currentPage} />
    </div>
  )
}
