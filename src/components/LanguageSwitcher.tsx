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
    <div className='relative ml-4'>
      <button
        onClick={toggleDropdown}
        className='p-1 rounded transition duration-300 focus:outline-none bg-gray-700 hover:bg-gray-600'
        aria-label='Toggle language menu'
      >
        <img
          src={`/src/assets/images/${activeLanguage === 'en' ? 'Flag_of_the_United_Kingdom_(3-5).svg' : 'Flag_of_Vietnam.svg'}`}
          alt={activeLanguage === 'en' ? 'English' : 'Vietnamese'}
          className='h-6 w-8 object-cover rounded'
        />
      </button>

      {isOpen && (
        <div className='absolute mt-2 md:w-40 w-auto bg-white rounded shadow-lg border border-gray-300'>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`flex items-center w-full p-2 hover:bg-gray-100 transition-colors rounded-t ${
              activeLanguage === 'en' ? 'bg-gray-200' : ''
            }`}
            aria-label='Change language to English'
          >
            <img
              src='/src/assets/images/Flag_of_the_United_Kingdom_(3-5).svg'
              alt='English'
              className='h-5 w-7 object-cover rounded mr-2'
            />
            <span className='text-sm text-gray-800 hidden md:block'>{t('language.en')}</span>
          </button>
          <button
            onClick={() => handleLanguageChange('vi')}
            className={`flex items-center w-full p-2 hover:bg-gray-100 transition-colors rounded-b ${
              activeLanguage === 'vi' ? 'bg-gray-200' : ''
            }`}
            aria-label='Change language to Vietnamese'
          >
            <img
              src='/src/assets/images/Flag_of_Vietnam.svg'
              alt='Vietnamese'
              className='h-5 w-7 object-cover rounded mr-2'
            />
            <span className='text-sm text-gray-800 hidden md:block'>{t('language.vi')}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
