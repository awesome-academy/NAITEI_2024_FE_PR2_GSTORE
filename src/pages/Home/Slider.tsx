import { useState, useEffect, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getData } from '../../services/dataService'
import { Slide } from '../../types/slide.type'

const Slider = () => {
  const { t } = useTranslation('home')
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlide, setCurrentSlide] = useState(1)
  const [nextSlide, setNextSlide] = useState(1)
  const [isFading, setIsFading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const getSlides = async () => {
      const data = await getData('slides')
      setSlides(data)
    }

    getSlides()
  }, [])

  const handleSlide = (slideNumber: SetStateAction<number>) => {
    if (isAnimating || slideNumber === currentSlide) return
    setIsAnimating(true)
    setNextSlide(slideNumber)
    setIsFading(true)
    setTimeout(() => {
      setCurrentSlide(slideNumber)
      setIsFading(false)
      setIsAnimating(false)
    }, 1000)
  }

  const getBackgroundStyle = (slideNumber: number) => {
    const slide = slides[slideNumber - 1]
    return slide ? { backgroundImage: `url(${slide.backgroundImage})` } : {}
  }

  return (
    <div className='slider relative h-[600px]'>
      {slides.length > 0 && (
        <>
          <div
            className={`absolute inset-0 bg-cover bg-[60%] md:bg-top ${isFading ? 'fadeOut' : ''}`}
            style={getBackgroundStyle(currentSlide)}
          ></div>

          <div
            className={`absolute inset-0 bg-cover bg-[60%] md:bg-top ${isFading ? 'fadeIn' : ''}`}
            style={getBackgroundStyle(nextSlide)}
          >
            <div className='mx-auto flex h-full w-full max-w-screen-xl items-center justify-center px-4 md:justify-start'>
              <div className='flex max-w-lg flex-col items-center text-center font-raleway text-white md:items-start md:text-start'>
                <h1
                  dangerouslySetInnerHTML={{ __html: slides[nextSlide - 1].title }}
                  className={`mb-4 text-6xl ${isFading ? 'slideDown' : ''}`}
                ></h1>
                <h2 className={`mb-4 font-playball text-5xl ${isFading ? 'slideDown' : ''}`}>
                  {slides[nextSlide - 1].subTitle}
                </h2>
                <h3 className={`mb-4 ${isFading ? 'slideUp' : ''}`}>{slides[nextSlide - 1].description}</h3>
                <Link
                  to='/shop'
                  className={`max-w-[150px] bg-black px-4 py-4 text-center font-extrabold hover:bg-yellow-500 ${isFading ? 'slideUp' : ''}`}
                >
                  {t('slider.shop_now')}
                </Link>
              </div>
            </div>
          </div>

          <div className='absolute bottom-0 flex w-full flex-row justify-between px-8 text-xl text-white md:right-0 md:top-1/2 md:w-auto md:flex-col md:justify-normal'>
            {slides.map((_, index) => (
              <button key={index} onClick={() => handleSlide(index + 1)} className='group relative mb-2 pb-2'>
                {String(index + 1).padStart(2, '0')}
                <span
                  className={`absolute bottom-0 right-[-33%] h-[2px] bg-white transition-all duration-300 ease-out md:right-0 ${
                    nextSlide === index + 1 ? 'w-[200%]' : 'w-0 group-hover:w-[200%]'
                  }`}
                ></span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Slider
