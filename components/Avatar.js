import { useState } from 'react'
import altogic from '@/libs/altogic'

export default function Avatar({ user, setUser }) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    e.target.value = null
    if (!file) return
    try {
      setLoading(true)
      setErrors(null)
      const { publicPath } = await updateProfilePicture(file)
      const updatedUser = await updateUser({ profilePicture: publicPath })
      setUser(updatedUser)
    } catch (e) {
      setErrors(e.message)
    } finally {
      setLoading(false)
    }
  }
  const updateProfilePicture = async (file) => {
    const { data, errors } = await altogic.storage
      .bucket('root')
      .upload(`user_${user._id}`, file)
    if (errors) throw new Error("Couldn't upload file")
    return data
  }
  const updateUser = async (data) => {
    const { data: updatedUser, errors } = await altogic.db
      .model('users')
      .object(user._id)
      .update(data)
    if (errors) throw new Error("Couldn't update user")
    return updatedUser
  }

  return (
    <div>
      <figure className="flex flex-col items-center justify-center gap-4 py-2">
        <picture className="h-24 w-24 overflow-hidden rounded-full border">
          <img
            className="h-full w-full object-cover"
            src={
              user?.profilePicture ||
              `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`
            }
            alt={user?.name}
          />
        </picture>
      </figure>
      <div className="flex flex-col items-center justify-center gap-4">
        <label className="cursor-pointer border p-2">
          <span>{loading ? 'Uploading...' : 'Change Avatar'}</span>

          <input
            disabled={loading}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {errors && <div className="bg-red-500 p-2 text-white">{errors}</div>}
      </div>
    </div>
  )
}
