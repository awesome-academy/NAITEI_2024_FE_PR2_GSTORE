import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Product } from '../types/product.type'
import { ClientReview } from '../types/clientReview.type'
import { News } from '../types/news.type'
import ItemCard from '../pages/Home/ItemCard'

interface CarouselProps {
  items: (Product | ClientReview | News)[]
  itemsPerPage?: number
  id?: string
  itemType: 'product' | 'review' | 'news'
}

const Carousel: React.FC<CarouselProps> = ({
  items = [],
  itemsPerPage = 1,
  id = 'carousel',
  itemType
}: CarouselProps) => {
  const getItemsPerPage = useCallback((): number => {
    if (window.innerWidth >= 1024) return itemsPerPage
    if (window.innerWidth >= 768) return 2
    return 1
  }, [itemsPerPage])
  const [itemPage, setItemPage] = useState(itemsPerPage)
  const [currentIndex, setCurrentIndex] = useState(itemsPerPage)
  const [isManual, setIsManual] = useState(false)
  const translateX = useMemo(() => -(currentIndex * (100 / itemPage)), [currentIndex, itemPage])
  const extendedItems = [...items.slice(-itemsPerPage), ...items, ...items.slice(0, itemsPerPage)]

  const goToNext = useCallback(() => {
    const carousel = document.getElementById(id)

    if (currentIndex === items.length + itemsPerPage) {
      carousel?.classList.add('transition-none')
      setCurrentIndex(itemsPerPage)
      setTimeout(() => {
        carousel?.classList.remove('transition-none')
        document.getElementById(`next-${id}`)?.click()
      }, 50)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }, [currentIndex, items.length, id, itemsPerPage])

  const goToPrevious = useCallback(() => {
    const carousel = document.getElementById(id)

    if (currentIndex === 0) {
      carousel?.classList.add('transition-none')
      setCurrentIndex(items.length)
      setTimeout(() => {
        carousel?.classList.remove('transition-none')
        document.getElementById(`previous-${id}`)?.click()
      }, 50)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex, items.length, id])

  useEffect(() => {
    const handleResize = () => setItemPage(getItemsPerPage())

    handleResize()
    window.addEventListener('resize', handleResize)
    const intervalId = setInterval(() => {
      goToNext()
    }, 3000)

    if (!isManual) {
      return () => clearInterval(intervalId)
    }

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('resize', handleResize)
    }
  }, [isManual, currentIndex, goToNext, itemPage, getItemsPerPage])

  return (
    <div className='group/all relative overflow-hidden'>
      <div
        className='flex transition-all duration-500 ease-in-out'
        style={{
          transform: `translate3d(${translateX}%, 0, 0)`
        }}
        id={id}
      >
        {extendedItems.map((item, index) => (
          <ItemCard key={index} item={item} itemType={itemType} />
        ))}
      </div>
      <button
        onClick={() => {
          setIsManual(true)
          goToPrevious()
        }}
        className='absolute left-0 top-1/3 rounded-full bg-white p-2 text-black opacity-0 shadow-md hover:bg-yellow-500 hover:text-white group-hover/all:opacity-100'
        id={`previous-${id}`}
      >
        <FaChevronLeft size={25} />
      </button>
      <button
        onClick={() => {
          setIsManual(true)
          goToNext()
        }}
        className='absolute right-0 top-1/3 rounded-full bg-white p-2 text-black opacity-0 shadow-md hover:bg-yellow-500 hover:text-white group-hover/all:opacity-100'
        id={`next-${id}`}
      >
        <FaChevronRight size={25} />
      </button>
    </div>
  )
}

export default Carousel
