import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import LanguageSwitcher from './LanguageSwitcher'

interface UserMenuProps {
  mobile?: boolean
}

const UserMenu: React.FC<UserMenuProps> = ({ mobile }) => {
  const { t, i18n } = useTranslation('header')

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className={`${mobile ? 'flex ' : 'hidden md:flex '}items-center`}>
      <Link
        to='/login'
        className='flex flex-col items-center border-r-2 border-gray-600 pr-4 hover:border-gray-400 transition-all duration-300'
      >
        <FaUser className='h-5 w-5 mb-1 hover:scale-110 transition-transform duration-300 hover:text-blue-400' />
        <small className='text-xs text-gray-400 transition-colors duration-300 hover:text-blue-400'>{t('login')}</small>
      </Link>
      <Link
        to='/wishlist'
        className='flex flex-col items-center border-r-2 border-gray-600 px-4 hover:border-gray-400 transition-all duration-300'
      >
        <FaHeart className='h-5 w-5 mb-1 hover:scale-110 transition-transform duration-300 hover:text-red-500' />
        <small className='text-xs text-gray-400 transition-colors duration-300 hover:text-red-500'>
          {t('wish_list')}
        </small>
      </Link>
      <Link to='/cart' className='flex flex-col items-center px-4 hover:border-gray-400 transition-all duration-300'>
        <FaShoppingCart className='h-5 w-5 mb-1 hover:scale-110 transition-transform duration-300 hover:text-yellow-400' />
        <small className='text-xs text-gray-400 transition-colors duration-300 hover:text-yellow-400'>
          {t('my_cart')}
        </small>
      </Link>

      <LanguageSwitcher onLanguageChange={handleLanguageChange} />
    </div>
  )
}

export default UserMenu
