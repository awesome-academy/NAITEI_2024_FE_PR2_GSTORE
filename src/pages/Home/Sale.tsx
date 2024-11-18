import SaleImg1 from '../../assets/images/sale1.jpg'
import SaleImg2 from '../../assets/images/sale2.jpg'

const Sale = () => {
  return (
    <>
      <div className='flex flex-row flex-wrap'>
        <div className='basis-full md:basis-1/2'>
          <img src={SaleImg1} alt='Sale' className='w-full object-cover' />
        </div>
        <div className='basis-full md:basis-1/2'>
          <img src={SaleImg2} alt='Sale' className='w-full object-cover' />
        </div>
      </div>
    </>
  )
}

export default Sale
