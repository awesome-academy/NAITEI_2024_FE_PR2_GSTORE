import { useTranslation } from 'react-i18next'
import LoginImg from '../../assets/images/top-bg.jpg'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'

const Register = () => {
  const { t } = useTranslation('register')
  return (
    <>
      <div className='bg-cover py-20 font-raleway' style={{ backgroundImage: `url('${LoginImg}')` }}>
        <div className='container-custom'>
          <h2 className='group relative mb-8 inline-block pb-4 text-4xl font-medium'>
            {t('createAccount')}
            <span className='absolute bottom-0 left-0 h-1 w-12 bg-black transition-all duration-300 ease-out group-hover:w-full' />
          </h2>
          <Breadcrumb />
        </div>
      </div>
      <div className='py-16 font-raleway'>
        <div className='container-custom'>
          <div className='mx-80 bg-gray-100 p-8'>
            <p className='my-4 font-semibold uppercase'>{t('welcome')}</p>
            <RegisterForm />
            <hr className='mb-8 mt-8 border-t-2'></hr>
            <div>
              <p className='mb-2 font-semibold uppercase'>{t('have_account')}</p>
              <Link
                to='/login'
                className='inline-block w-full rounded bg-black px-4 py-3 text-center text-white transition hover:bg-yellow-500 hover:text-black'
              >
                {t('login_now')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
