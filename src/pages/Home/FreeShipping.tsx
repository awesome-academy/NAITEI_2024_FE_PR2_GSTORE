import { useTranslation } from 'react-i18next'
import img from '../../assets/images/freeShipping.jpg'
import { Link } from 'react-router-dom'

const FreeShipping = () => {
  const { t } = useTranslation('home')
  return (
    <>
      <div
        className='bg-black bg-opacity-50 bg-cover bg-fixed py-16 font-raleway bg-blend-color'
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className='mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between px-4 font-raleway text-white md:flex-row'>
          <h2 className='mb-4 text-center text-2xl md:text-4xl'>{t('free_shipping.title')}</h2>
          <Link
            to='/products'
            className='bg-white px-11 py-3 font-bold uppercase text-black hover:bg-yellow-500 hover:text-white'
          >
            {t('slider.shop_now')}
          </Link>
        </div>
      </div>
    </>
  )
}

export default FreeShipping
