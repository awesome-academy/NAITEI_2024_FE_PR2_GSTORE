import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import 'react-toastify/dist/ReactToastify.css'
import { validateRegistration } from './ValidateRegister'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const { t } = useTranslation('register')
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setAvatar(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (password !== confirmPassword) {
      toast.error(t('alert.password_mismatch'), {
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
      setLoading(false)
      return
    }

    try {
      const isRegistered = await validateRegistration(name, username, email, password, avatar)
      if (isRegistered) {
        toast.success(t('alert.registration_successful'), {
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
          navigate('/login')
        }, 1000)
      } else {
        toast.error(t('alert.registration_failed'), {
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Full Name'
        className='mb-4 h-12 rounded-md border border-gray-300 px-4 shadow-sm transition duration-200 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200'
      />
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t('username')}
        className='mb-4 h-12 rounded-md border border-gray-300 px-4 shadow-sm transition duration-200 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200'
      />
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
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
      </div>
      <div className='relative mb-4'>
        <input
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t('confirm_password')}
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
      <input type='file' accept='image/*' onChange={handleAvatarChange} className='mb-4' />
      {preview && <img src={preview} alt='Avatar preview' className='mb-4 h-24 w-24 rounded-full object-cover' />}
      {error && <p className='mb-4 text-red-600'>{error}</p>}
      <button
        type='submit'
        className='h-12 rounded-md bg-black font-medium text-white shadow-md transition duration-200 hover:bg-yellow-500 hover:text-black'
        disabled={loading}
      >
        {loading ? t('registering') : t('title')}
      </button>
      <ToastContainer />
    </form>
  )
}

export default RegisterForm
