import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { FaBars, FaTimes } from 'react-icons/fa'
import MenuItems from '../components/MenuItems'
import UserMenu from '../components/UserMenu'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className='bg-black p-3 text-white relative'>
      <div className='mx-auto px-4 w-full max-w-screen-xl'>
        <nav className='flex items-center justify-between py-2 px-4'>
          <Link to='/' aria-label='Home'>
            <img
              src={logo}
              alt='logo'
              className='max-h-20 max-w-[150px] hover:opacity-80 transition-opacity duration-300'
            />
          </Link>
          <button className='md:hidden text-white p-2' onClick={toggleMenu} aria-label='Toggle menu'>
            {menuOpen ? <FaTimes className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
          </button>
          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } md:hidden absolute top-full left-0 w-full bg-black z-20 pt-3 transition-all duration-300`}
          >
            {/* Container cho MenuItems và UserMenu để căn chỉnh tốt hơn */}
            <div className='flex flex-col items-center space-y-4'>
              <MenuItems mobile={true} />
              <UserMenu mobile={true} />
            </div>
          </div>

          <MenuItems mobile={false} />

          <UserMenu mobile={false} />
        </nav>
      </div>
    </header>
  )
}

export default Header
