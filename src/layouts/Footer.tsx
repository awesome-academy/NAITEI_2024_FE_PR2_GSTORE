import { useTranslation } from 'react-i18next'
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from 'react-icons/fa'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import { TiSocialFacebook } from 'react-icons/ti'

const Footer = () => {
  const { t } = useTranslation('footer')

  return (
    <footer className='text-white'>
      <div className='bg-gray-900 py-16'>
        <div className='mx-auto w-full max-w-screen-xl px-4'>
          <ul className='flex flex-row flex-wrap'>
            <li className='basis-full px-[15px] md:basis-1/4'>
              <h2 className='relative pb-4 text-white transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[9%] before:bg-[#e3a51e] before:transition-all before:duration-300 before:content-[""] hover:text-[#e3a51e] hover:before:w-full'>
                {t('about_the_store')}
              </h2>
              <p className='my-[15px] text-xs'>{t('description')}</p>
            </li>
            <li className='basis-full px-[15px] md:basis-1/4'>
              <h2 className='relative pb-4 text-white transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[9%] before:bg-[#e3a51e] before:transition-all before:duration-300 before:content-[""] hover:text-[#e3a51e] hover:before:w-full'>
                {t('help_&_contact.title')}
              </h2>
              <ul className='my-[15px] text-xs'>
                {(
                  [
                    'help_&_contact.all_help_topics',
                    'help_&_contact.about_store',
                    'help_&_contact.how_it_works',
                    'help_&_contact.how_to_buy',
                    'help_&_contact.about_our_return_policy'
                  ] as const
                ).map((key, index) => (
                  <li
                    key={index}
                    className='mb-[7.5px] cursor-pointer p-1 transition-all duration-300 hover:text-[#e3a51e]'
                  >
                    {t(key)}
                  </li>
                ))}
              </ul>
            </li>
            <li className='basis-full px-[15px] md:basis-1/4'>
              <h2 className='relative pb-4 text-white transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[9%] before:bg-[#e3a51e] before:transition-all before:duration-300 before:content-[""] hover:text-[#e3a51e] hover:before:w-full'>
                {t('easy_online_shopping.title')}
              </h2>
              <ul className='my-[15px] text-xs'>
                {(
                  [
                    'easy_online_shopping.free_delivery',
                    'easy_online_shopping.100_days_return',
                    'easy_online_shopping.free_return',
                    'easy_online_shopping.contact_us'
                  ] as const
                ).map((key, index) => (
                  <li
                    key={index}
                    className='mb-[7.5px] cursor-pointer p-1 transition-all duration-300 hover:text-[#e3a51e]'
                  >
                    {t(key)}
                  </li>
                ))}
              </ul>
            </li>
            <li className='basis-full px-[15px] md:basis-1/4'>
              <h2 className='relative pb-4 text-white transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[9%] before:bg-[#e3a51e] before:transition-all before:duration-300 before:content-[""] hover:text-[#e3a51e] hover:before:w-full'>
                {t('payment_methods')}
              </h2>
              <ul className='mt-[15px] flex'>
                <li className='mr-[15px]'>
                  <FaCcVisa size={45} />
                </li>
                <li className='mr-[15px]'>
                  <FaCcPaypal size={45} />
                </li>
                <li className='mr-[15px]'>
                  <FaCcMastercard size={45} />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className='bg-black py-3'>
        <div className='mx-auto w-full max-w-screen-xl px-4'>
          <ul className='flex flex-nowrap justify-between px-[15px]'>
            <li>
              <small>{t('copy_right')}</small>
            </li>
            <li>
              <ul className='flex'>
                <li className='mr-4 cursor-pointer p-1 transition-colors duration-300 hover:bg-[#1877F2]'>
                  <TiSocialFacebook size={20} className='text-[white]' />
                </li>
                <li className='mr-4 cursor-pointer p-1 transition-colors duration-300 hover:bg-[#E1306C]'>
                  <FaInstagram size={20} className='text-white' />
                </li>
                <li className='cursor-pointer p-1 transition-colors duration-300 hover:bg-[#1DA1F2]'>
                  <FaTwitter size={20} className='text-white' />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
