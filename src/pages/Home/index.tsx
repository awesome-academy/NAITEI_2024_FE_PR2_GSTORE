import { useTranslation } from 'react-i18next'
import Banner from '../../components/Banner'
import ClientReviews from './ClientReviews'
import NewArrival from './NewArrival'
import Sale from './Sale'
import Slider from './Slider'
import TopProducts from './TopProducts'
import FreeShipping from './FreeShipping'
import News from './News'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const { t } = useTranslation('home')
  return (
    <>
      <Slider />
      <NewArrival />
      <Banner title={t('banner.title')} description={t('banner.description')} img='/src/assets/images/deal.jpg' />
      <TopProducts />
      <Sale />
      <ClientReviews />
      <FreeShipping />
      <News />
      <ToastContainer />
    </>
  )
}

export default Home
