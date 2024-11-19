import { useEffect, useState } from 'react'
import { Product } from '../../types/product.type'
import { useTranslation } from 'react-i18next'
import Carousel from '../../components/Carousel'
import { getData } from '../../services/dataService'

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([])
  const { t } = useTranslation(['home'])
  useEffect(() => {
    const getTopProducts = async () => {
      const data = await getData('products', { _limit: 8, _sort: 'rating.count', _order: 'desc' })
      setTopProducts(data)
    }
    getTopProducts()
  }, [])
  return (
    <>
      <div className='mx-auto w-full max-w-screen-xl px-4 py-16 text-center font-raleway'>
        <h2 className='pb-5 text-4xl font-medium uppercase leading-4'>{t('home:top_products.title')}</h2>
        <p className='mb-11 text-gray-500'>{t('home:top_products.description')}</p>
        <Carousel items={topProducts} itemsPerPage={4} id='top-products' itemType='product' />
      </div>
    </>
  )
}

export default TopProducts
