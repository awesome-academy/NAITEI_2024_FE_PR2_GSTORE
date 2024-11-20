import { useEffect, useState } from 'react'
import { ClientReview } from '../../types/clientReview.type'
import { getData } from '../../services/dataService'
import Carousel from '../../components/Carousel'
import { useTranslation } from 'react-i18next'

const ClientReviews = () => {
  const { t } = useTranslation('home')
  const [clientReviews, setClientReviews] = useState<ClientReview[]>([])

  useEffect(() => {
    const getClientReviews = async () => {
      const data = await getData('reviews', { _limit: 4, _sort: 'rating', _order: 'desc' })
      setClientReviews(data)
    }
    getClientReviews()
  }, [])
  return (
    <>
      <div className='mx-auto w-full max-w-screen-xl px-4 py-16 text-center font-raleway'>
        <h2 className='pb-5 text-4xl font-medium uppercase leading-4'>{t('review.title')}</h2>
        <p className='mb-11 text-gray-500'>{t('review.description')}</p>
        <Carousel items={clientReviews} itemsPerPage={3} id='client-reviews' itemType='review' />
      </div>
    </>
  )
}

export default ClientReviews
