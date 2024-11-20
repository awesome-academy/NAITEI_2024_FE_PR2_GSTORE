import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import LanguageSwitcher from './LanguageSwitcher'
import { useState } from 'react'
import { decodeJwt } from 'jose'
import { GoTriangleDown } from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'
import { MdLogout } from 'react-icons/md'
import { BsReceipt } from 'react-icons/bs'

interface UserMenuProps {
  mobile?: boolean
}

interface DecodedToken {
  avatar: string
  name: string
  id: number
}

const UserMenu: React.FC<UserMenuProps> = ({ mobile }) => {
  const { t, i18n } = useTranslation('header')
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  let avatarUrl = ''
  let userName = ''

  if (token) {
    try {
      const decodedToken = decodeJwt(token) as DecodedToken
      avatarUrl = decodedToken.avatar || ''
      userName = decodedToken.name || ''
    } catch (error) {
      console.error('Invalid token:', error)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    setDropdownOpen(false)
    navigate('/login')
  }

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className={`${mobile ? 'flex' : 'hidden md:flex'} items-center`}>
      {token ? (
        <div className='relative flex cursor-pointer items-center'>
          <div className='flex items-center' onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img
              src={avatarUrl}
              alt={userName}
              className='mr-2 h-11 w-11 cursor-pointer rounded-full border-2 border-gray-400 object-cover hover:border-gray-600'
            />
            <GoTriangleDown size={18} />
          </div>

          {dropdownOpen && (
            <div className='absolute right-0 top-12 z-50 w-48 rounded-lg bg-white py-2 shadow-lg'>
              <Link
                to='/profile'
                className='flex items-center px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-yellow-500'
              >
                <CgProfile size={20} className='mr-2' /> {t('profile')}
              </Link>
              <Link
                to='/profile'
                className='flex items-center px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-yellow-500'
              >
                <BsReceipt size={20} className='mr-2' /> {t('history_purchase')}
              </Link>
              <button
                onClick={handleLogout}
                className='flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500'
              >
                <MdLogout size={20} className='mr-2' /> {t('logout')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to='/login'
          className='flex flex-col items-center border-r-2 border-gray-600 pr-4 transition-all duration-300 hover:border-gray-400'
        >
          <FaUser className='mb-1 h-5 w-5 transition-transform duration-300 hover:scale-110 hover:text-blue-400' />
          <small className='text-xs text-gray-400 transition-colors duration-300 hover:text-blue-400'>
            {t('login')}
          </small>
        </Link>
      )}
      <Link
        to='/wishlist'
        className='flex flex-col items-center border-r-2 border-gray-600 px-4 transition-all duration-300 hover:border-gray-400'
      >
        <FaHeart className='mb-1 h-5 w-5 transition-transform duration-300 hover:scale-110 hover:text-red-500' />
        <small className='text-xs text-gray-400 transition-colors duration-300 hover:text-red-500'>
          {t('wish_list')}
        </small>
      </Link>
      <Link to='/cart' className='flex flex-col items-center px-4 transition-all duration-300 hover:border-gray-400'>
        <FaShoppingCart className='mb-1 h-5 w-5 transition-transform duration-300 hover:scale-110 hover:text-yellow-400' />
        <small className='text-xs text-gray-400 transition-colors duration-300 hover:text-yellow-400'>
          {t('my_cart')}
        </small>
      </Link>

      <LanguageSwitcher onLanguageChange={handleLanguageChange} />
    </div>
  )
}

export default UserMenu
