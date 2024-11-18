import Carousel from '../../components/Carousel'
import type { News } from '../../types/news.type'
import { getData } from '../../services/dataService'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const News = () => {
  const { t } = useTranslation('home')
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    const getNews = async () => {
      const data = await getData('news', { _limit: 8 })
      setNews(data)
    }
    getNews()
  }, [])
  return (
    <div className='mx-auto w-full max-w-screen-xl px-4 py-16 text-center font-raleway'>
      <h2 className='pb-5 text-4xl font-medium uppercase leading-4'>{t('news.title')}</h2>
      <p className='mb-11 text-gray-500'>{t('news.description')}</p>
      <Carousel items={news} itemType='news' itemsPerPage={3} id='news' />
    </div>
  )
}

export default News
