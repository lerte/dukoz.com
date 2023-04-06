import { useRef, useState } from 'react'
import altogic from '@/libs/altogic'

export default function UserInfo({ user, setUser }) {
  const inputRef = useRef()

  const [name, setName] = useState('')

  const [changeMode, setChangeMode] = useState(false)
  const [errors, setErrors] = useState(null)

  const handleNameChange = () => {
    setChangeMode(true)
    setTimeout(() => {
      inputRef.current.focus()
    }, 100)
  }

  const handleKeyDown = async (e) => {
    if (e.code === 'Enter') {
      setErrors(null)

      const { data: updatedUser, errors: apiErrors } = await altogic.db
        .model('users')
        .object(user._id)
        .update({ name })

      if (apiErrors) setErrors(apiErrors.items[0].message)
      else setUser(updatedUser)

      setChangeMode(false)
    }
  }

  return (
    <section className="w-full border p-4">
      {changeMode ? (
        <div className="flex items-center justify-center">
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            type="text"
            className="border-none text-center text-3xl"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-3xl">Hello, {user?.name}</h1>
          <button onClick={handleNameChange} className="border p-2">
            Change name
          </button>
        </div>
      )}
      {errors && <div>{errors}</div>}
    </section>
  )
}
