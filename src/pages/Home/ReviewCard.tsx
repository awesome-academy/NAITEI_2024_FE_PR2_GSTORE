import { FaStar } from 'react-icons/fa'
import { ClientReview } from '../../types/clientReview.type'

interface ReviewProps {
  review: ClientReview
}

const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className='md:min-w-1-3 flex min-w-full flex-col items-center justify-center rounded-lg bg-white p-4'>
      <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gray-200'>
        <img className='h-full w-full rounded-full object-cover' src={review.avatar} alt={review.name} />
      </div>
      <div className='mt-4 flex justify-center'>
        {Array.from({ length: Math.ceil(review.rating) }).map((_, i) => (
          <FaStar key={i} className='text-yellow-500' />
        ))}
        {Array.from({ length: 5 - Math.ceil(review.rating) }).map((_, i) => (
          <FaStar key={i} className='text-gray-300' />
        ))}
      </div>
      <h3 className='mt-4 text-center text-xl font-semibold'>{review.name}</h3>
      <p className='mt-2 text-center text-sm'>{review.comment}</p>
    </div>
  )
}

export default ReviewCard
