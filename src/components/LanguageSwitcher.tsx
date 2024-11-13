import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface LanguageSwitcherProps {
  onLanguageChange: (language: string) => void
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange }) => {
  const { t } = useTranslation('header')
  const [activeLanguage, setActiveLanguage] = useState('en')
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (language: string) => {
    setActiveLanguage(language)
    onLanguageChange(language)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative z-10 ml-4'>
      <button
        onClick={toggleDropdown}
        className='rounded bg-gray-700 p-1 transition duration-300 hover:bg-gray-600 focus:outline-none'
        aria-label='Toggle language menu'
      >
        <img
          src={`/src/assets/images/${activeLanguage === 'en' ? 'Flag_of_the_United_Kingdom_(3-5).svg' : 'Flag_of_Vietnam.svg'}`}
          alt={activeLanguage === 'en' ? 'English' : 'Vietnamese'}
          className='h-6 w-8 rounded object-cover'
        />
      </button>

      {isOpen && (
        <div className='absolute mt-2 w-auto rounded border border-gray-300 bg-white shadow-lg md:w-40'>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`flex w-full items-center rounded-t p-2 transition-colors hover:bg-gray-100 ${
              activeLanguage === 'en' ? 'bg-gray-200' : ''
            }`}
            aria-label='Change language to English'
          >
            <img
              src='/src/assets/images/Flag_of_the_United_Kingdom_(3-5).svg'
              alt='English'
              className='mr-2 h-5 w-7 rounded object-cover'
            />
            <span className='hidden text-sm text-gray-800 md:block'>{t('language.en')}</span>
          </button>
          <button
            onClick={() => handleLanguageChange('vi')}
            className={`flex w-full items-center rounded-b p-2 transition-colors hover:bg-gray-100 ${
              activeLanguage === 'vi' ? 'bg-gray-200' : ''
            }`}
            aria-label='Change language to Vietnamese'
          >
            <img
              src='/src/assets/images/Flag_of_Vietnam.svg'
              alt='Vietnamese'
              className='mr-2 h-5 w-7 rounded object-cover'
            />
            <span className='hidden text-sm text-gray-800 md:block'>{t('language.vi')}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
