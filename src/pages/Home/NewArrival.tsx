import { useEffect, useState } from 'react'
import { Product } from '../../types/product.type'
import { getData } from '../../services/dataService'
import Carousel from '../../components/Carousel'
import { useTranslation } from 'react-i18next'

const NewArrival = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const { t } = useTranslation(['home'])
  useEffect(() => {
    const getNewProducts = async () => {
      const data = await getData('products', { _limit: 8, _sort: 'price', _order: 'desc' })
      setNewProducts(data)
    }
    getNewProducts()
  }, [])
  return (
    <>
      <div className='mx-auto w-full max-w-screen-xl px-4 py-16 text-center font-raleway'>
        <h2 className='pb-5 text-4xl font-medium uppercase leading-4'>{t('home:new_arrivals.title')}</h2>
        <p className='mb-11 text-gray-500'>{t('home:new_arrivals.description')}</p>
        <Carousel items={newProducts} itemType='product' id='new-arrival' itemsPerPage={4} />
      </div>
    </>
  )
}

export default NewArrival
