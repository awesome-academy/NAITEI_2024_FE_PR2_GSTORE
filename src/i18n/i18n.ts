import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HEADER_EN from '../locales/en/header.json'
import HEADER_VI from '../locales/vi/header.json'
import FOOTER_EN from '../locales/en/footer.json'
import FOOTER_VI from '../locales/vi/footer.json'

export const resources = {
  en: {
    header: HEADER_EN,
    footer: FOOTER_EN
  },
  vi: {
    header: HEADER_VI,
    footer: FOOTER_VI
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
