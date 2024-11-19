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
import LOGIN_EN from '../locales/en/login.json'
import LOGIN_VI from '../locales/vi/login.json'
import BREADCRUMB_EN from '../locales/en/breadcrumb.json'
import BREADCRUMB_VI from '../locales/vi/breadcrumb.json'
import REGISTER_EN from '../locales/en/register.json'
import REGISTER_VI from '../locales/vi/register.json'
import CART_EN from '../locales/en/cart.json'
import CART_VI from '../locales/vi/cart.json'

export const resources = {
  en: {
    header: HEADER_EN,
    footer: FOOTER_EN,
    filter: FILTER_EN,
    product: PRODUCT_EN,
    home: HOME_EN,
    login: LOGIN_EN,
    breadcrumb: BREADCRUMB_EN,
    register: REGISTER_EN,
    cart: CART_EN
  },
  vi: {
    header: HEADER_VI,
    footer: FOOTER_VI,
    filter: FILTER_VI,
    product: PRODUCT_VI,
    home: HOME_VI,
    login: LOGIN_VI,
    breadcrumb: BREADCRUMB_VI,
    register: REGISTER_VI,
    cart: CART_VI
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
