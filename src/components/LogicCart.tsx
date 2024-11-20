import { toast, Bounce } from 'react-toastify'
import { getData, postData, putData } from '../../src/services/dataService'

import 'react-toastify/dist/ReactToastify.css'

interface CartItem {
  productId: number
  img: string
  productName: string
  price: number
  userId: number
  qty: number
}

export const addToCart = async (
  productId: number,
  img: string,
  productName: string,
  price: number,
  userId: number,
  qty: number
) => {
  try {
    const response = await getData('carts', { userId })
    if (response && response.length > 0) {
      const cart = response[0]
      const id = cart.id
      const existingProductIndex = cart.products.findIndex((item: CartItem) => item.productId === productId)

      if (existingProductIndex !== -1) {
        const updatedCart = [...cart.products]
        updatedCart[existingProductIndex].qty += 1

        await putData(`carts/${id}`, { userId, products: updatedCart })
        return 'Product quantity updated in cart.'
      } else {
        const newProduct = { productId, img, productName, price, qty }
        const updatedCart = [...cart.products, newProduct]

        await putData(`carts/${id}`, { userId, products: updatedCart })
        toast.success(`Add success ${productName}`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
        return 'Product added to cart.'
      }
    } else {
      const newCart = {
        userId,
        products: [{ productId, img, productName, price, qty: 1 }]
      }
      await postData('carts', newCart)
      return 'Product added to new cart.'
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    return 'Error adding product to cart. Please try again.'
  }
}
