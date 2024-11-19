import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'

const Breadcrumb: React.FC = () => {
  const { t } = useTranslation('breadcrumb')
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const formatLabel = (path: string) => {
    const formatted = path.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    console.log(formatted)
    return t(formatted.toLowerCase(), formatted.toLowerCase())
  }

  const breadcrumbItems = pathnames.map((path, index) => ({
    label: formatLabel(path),
    path: `/${pathnames.slice(0, index + 1).join('/')}`
  }))

  return (
    <nav>
      <ul className='flex text-base font-semibold text-black'>
        <li>
          <Link to='/' className='hover:text-yellow-600'>
            {t('home')}
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => {
          const isActive = location.pathname === item.path
          return (
            <li key={index} className='flex items-center'>
              <span className='mx-2'>/</span>
              {isActive ? (
                <span className='text-yellow-600'>{item.label}</span>
              ) : (
                <Link to={item.path} className='hover:text-yellow-600'>
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumb
