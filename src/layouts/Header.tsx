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
    <header className='relative bg-black p-3 text-white'>
      <div className='mx-auto w-full max-w-screen-xl px-4'>
        <nav className='flex items-center justify-between px-4 py-2'>
          <Link to='/' aria-label='Home'>
            <img
              src={logo}
              alt='logo'
              className='max-h-20 max-w-[150px] transition-opacity duration-300 hover:opacity-80'
            />
          </Link>
          <button className='p-2 text-white md:hidden' onClick={toggleMenu} aria-label='Toggle menu'>
            {menuOpen ? <FaTimes className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
          </button>
          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } absolute left-0 top-full z-20 w-full bg-black pt-3 transition-all duration-300 md:hidden`}
          >
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
