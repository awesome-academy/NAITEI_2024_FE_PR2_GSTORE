import React from 'react'
import ProductCard from './ProductCard'
import ReviewCard from './ReviewCard'
import { Product } from '../../types/product.type'
import { ClientReview } from '../../types/clientReview.type'
import { News } from '../../types/news.type'
import NewsCard from './NewsCard'

interface ItemCardProps {
  item: Product | ClientReview | News
  itemType: 'product' | 'review' | 'news'
}

const ItemCard: React.FC<ItemCardProps> = ({ item, itemType }) => {
  if (itemType === 'product') {
    return <ProductCard product={item as Product} />
  }

  if (itemType === 'review') {
    const review = item as ClientReview
    return <ReviewCard review={review} />
  }

  if (itemType === 'news') {
    const news = item as News
    return <NewsCard news={news} />
  }

  return null
}

export default ItemCard
