import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HEADER_EN from '../locales/en/header.json'
import HEADER_VI from '../locales/vi/header.json'
import FOOTER_EN from '../locales/en/footer.json'
import FOOTER_VI from '../locales/vi/footer.json'
import FILTER_EN from '../locales/en/filter.json'
import FILTER_VI from '../locales/vi/filter.json'
import PRODUCT_EN from '../locales/en/product.json'
import PRODUCT_VI from '../locales/vi/product.json'
import HOME_VI from '../locales/vi/home.json'
import HOME_EN from '../locales/en/home.json'
import WISHLIST_EN from '../locales/en/wishlist.json'
import WISHLIST_VI from '../locales/vi/wishlist.json'

export const resources = {
  en: {
    header: HEADER_EN,
    footer: FOOTER_EN,
    filter: FILTER_EN,
    product: PRODUCT_EN,
    home: HOME_EN,
    wishlist: WISHLIST_EN
  },
  vi: {
    header: HEADER_VI,
    footer: FOOTER_VI,
    filter: FILTER_VI,
    product: PRODUCT_VI,
    home: HOME_VI,
    wishlist: WISHLIST_VI
  }
}

export const defaultNS = 'header'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['header'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})
