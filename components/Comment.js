import dayjs from 'dayjs'
import { useState } from 'react'

export default function Comment({ currentPage, currentPost }) {
  return (
    <div className="flex h-full max-h-screen flex-col">
      {/* {JSON.stringify(currentPost)} */}
      <div className="flex border-b-2 border-gray-300 px-2 py-4">
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
      <ul className="border-b-2 border-gray-300">
        {currentPost?.comments?.data.map((comment) => (
          <li key={comment.id} className="mb-2 flex items-center  py-2 px-4">
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
          </li>
        ))}
      </ul>
    </div>
  )
}
