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
        mobile ? 'flex flex-col items-center space-y-4 p-4 bg-black text-white' : 'md:flex hidden space-x-6'
      } text-sm font-medium`}
    >
      {menuLinks.map((link) => (
        <li key={link.label} className={`${mobile ? 'w-full text-center' : ''}`}>
          <Link
            to={link.href}
            className={`p-2 block transition-colors duration-300 ${
              location.pathname === link.href ? 'text-amber-500 font-semibold' : 'hover:text-amber-500'
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
