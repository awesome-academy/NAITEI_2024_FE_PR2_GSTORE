import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

interface MenuItemsProps {
  mobile: boolean
}

const MenuItems: React.FC<MenuItemsProps> = ({ mobile }) => {
  const { t } = useTranslation('header')
  const location = useLocation()
  const menuLinks = [
    { label: t('home'), href: '/' },
    { label: 'Men', href: '/products' },
    { label: 'Women', href: '/women' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' }
  ]

  return (
    <ul
      className={`${
        mobile ? 'flex flex-col items-center space-y-4 bg-black p-4 text-white' : 'hidden space-x-6 md:flex'
      } text-sm font-medium`}
    >
      {menuLinks.map((link) => (
        <li key={link.label} className={`${mobile ? 'w-full text-center' : ''}`}>
          <Link
            to={link.href}
            className={`block p-2 transition-colors duration-300 ${
              location.pathname === link.href ? 'font-semibold text-amber-500' : 'hover:text-amber-500'
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MenuItems
