import { format } from 'date-fns'
import { News } from '../../types/news.type'
import { Link } from 'react-router-dom'
import { GoTriangleRight } from 'react-icons/go'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'

interface NewsProps {
  news: News
}

const NewsCard: React.FC<NewsProps> = ({ news }) => {
  const { t } = useTranslation('home')
  const formattedDate = format(new Date(news.date), 'dd MMM yyyy')

  return (
    <div className='md:min-w-1-3 mb-5 min-w-full px-5'>
      <div className='transform transition-transform hover:scale-105 hover:shadow-lg'>
        <div className='relative h-60'>
          <img className='h-full w-full object-cover' src={news.image} alt={news.title} />
          <div className='absolute bottom-0 w-full bg-gradient-to-t from-black p-3 text-white opacity-90'>
            <h3 className='text-lg font-semibold'>{news.title}</h3>
          </div>
          <div className='absolute right-2 top-2 rounded bg-yellow-500 px-2 py-1 text-xl font-bold text-white'>
            {formattedDate}
          </div>
        </div>
        <div className='p-4' id={`news-${news.id}`}>
          <p className='line-clamp-3 text-base text-gray-600'>{news.description}</p>
        </div>

        <Tooltip anchorSelect={`#news-${news.id}`} className='max-w-xs whitespace-normal text-xl'>
          {news.description}
        </Tooltip>

        <div className='flex justify-center py-2'>
          <Link to={`/news/${news.id}`} className='text-black hover:text-yellow-600'>
            {t('news.read_more')}
            <GoTriangleRight className='inline-block' size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
