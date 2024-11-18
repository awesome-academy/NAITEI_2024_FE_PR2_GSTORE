import React from 'react'
import { Tooltip } from 'react-tooltip'
import { Product } from '../../types/product.type'
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

interface ProductProps {
  product: Product
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const { title, img, prevPrice, price, rating } = product
  const { t } = useTranslation(['product'])
  return (
    <div className='min-w-full px-0 md:min-w-[25%] md:px-5'>
      <div className='group relative rounded-lg border border-transparent transition-all duration-300 hover:border-gray-300 hover:shadow-lg'>
        <div className='group/img relative overflow-hidden'>
          <img
            src={img}
            alt={title}
            className='max-h-64 w-full object-contain transition-transform duration-300 group-hover:scale-110'
          />

          <div className='absolute bottom-0 left-0 right-0 translate-y-4 bg-black py-2 text-white opacity-0 transition-all duration-300 group-hover/img:translate-y-0 group-hover/img:opacity-100'>
            <button className='m-auto flex items-center justify-center space-x-2 text-base font-semibold text-white hover:text-red-500'>
              <span>{t('product.wishlist')}</span>
              <FaHeart className='h-5 w-5' />
            </button>
          </div>
        </div>

        <div className='my-3 truncate font-bold text-black group-hover:text-yellow-500' id={`product-${product.id}`}>
          {title}
        </div>

        <Tooltip className='z-10' anchorSelect={`#product-${product.id}`}>
          {title}
        </Tooltip>

        <div className='mb-3 flex justify-center'>
          <div className='mr-2'>${price}</div>
          <div className='text-gray-500 line-through'>{prevPrice}</div>
        </div>

        <div className='m-3 flex justify-center'>
          {Array.from({ length: Math.ceil(rating.rate) }).map((_, i) => (
            <FaStar key={i} className='text-yellow-500' />
          ))}
          {Array.from({ length: 5 - Math.ceil(rating.rate) }).map((_, i) => (
            <FaStar key={i} className='text-gray-300' />
          ))}
        </div>

        <div className='my-3 flex items-center justify-center'>
          <button className='flex items-center justify-center border-2 border-black px-4 py-2 text-sm uppercase text-black transition-colors duration-300 hover:bg-black hover:text-white'>
            {t('product.cart')}
            <FaShoppingCart className='ml-2' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
