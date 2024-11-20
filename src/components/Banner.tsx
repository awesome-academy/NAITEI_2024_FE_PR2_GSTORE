import { useTranslation } from 'react-i18next'
import { BannerProps } from '../types/banner.type'

const Banner: React.FC<BannerProps> = ({ title, description, img }) => {
  const { t } = useTranslation('home')
  return (
    <>
      <div
        className='bg-black bg-opacity-50 bg-cover bg-fixed py-20 font-raleway bg-blend-color'
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className='mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center px-4 text-center'>
          <h2 className='text-6xl font-bold uppercase text-white'>{title}</h2>
          <p className='my-10 font-playball text-4xl leading-none text-white'>{description}</p>
          <button className='bg-white px-8 py-3 font-semibold uppercase text-black shadow-md transition-colors duration-300 hover:bg-yellow-500 hover:text-white'>
            {t('slider.shop_now')}
          </button>
        </div>
      </div>
    </>
  )
}

export default Banner
