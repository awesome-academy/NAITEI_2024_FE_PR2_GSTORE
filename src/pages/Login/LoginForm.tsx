import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import 'react-toastify/dist/ReactToastify.css'
import { validateLogin } from './ValidateLogin'
import { useNavigate } from 'react-router-dom'
import { SignJWT } from 'jose'

const LoginForm = () => {
  const key = import.meta.env.VITE_APP_KEY
  const navigate = useNavigate()
  const { t } = useTranslation('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const users = await validateLogin(username, password)
      if (users.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...payload } = users[0]
        const encoder = new TextEncoder()
        const keyPrivate = encoder.encode(key)
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('2h')
          .sign(keyPrivate)
        sessionStorage.setItem('token', token)
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        toast.error('Invalid username or password!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto flex flex-col justify-center'>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t('username')}
        className='mb-4 h-12 rounded-md border border-gray-300 px-4 shadow-sm transition duration-200 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200'
      />
      <div className='relative mb-4'>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('password')}
          className='h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm transition duration-200 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200'
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-yellow-500'
        >
          {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
        </button>
      </div>
      {error && <p className='mb-4 text-red-600'>{error}</p>}
      <button
        type='submit'
        className='h-12 rounded-md bg-black font-medium text-white shadow-md transition duration-200 hover:bg-yellow-500 hover:text-black'
        disabled={loading}
      >
        {loading ? t('logging_in') : t('login')}
      </button>
      <ToastContainer />
    </form>
  )
}

export default LoginForm
