import Breadcrumb from '../../components/Breadcrumb'
import LoginImg from '../../assets/images/top-bg.jpg'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import { useCallback, useEffect, useRef, useState } from 'react'
import Decode from '../../components/Decode'
import { getData, putData } from '../../services/dataService'

interface Cart {
  productName: string
  img: string
  price: number
  productId: number
  qty: number
}

const Cart = () => {
  const { t } = useTranslation('cart')
  const [carts, setCarts] = useState([] as Cart[])
  const [subtotal, setSubtotal] = useState(0)
  const [shipping] = useState(10)
  const [discount, setDiscount] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [alert, setAlert] = useState('')
  const [alertColor, setAlertColor] = useState('')
  const cartId = useRef<number | undefined>(undefined)

  const calculateTotal = useCallback(() => {
    const newSubtotal = carts.reduce((acc, cart) => acc + cart.price * cart.qty, 0)
    setSubtotal(newSubtotal)
    setGrandTotal(newSubtotal + shipping - discount)
  }, [carts, shipping, discount])

  const updateQuantity = async (index: number, qty: number) => {
    const token = sessionStorage.getItem('token')
    const id = token ? Decode(token)?.id : undefined
    if (isNaN(qty) || qty < 1) qty = 1
    const updatedCarts = [...carts]
    updatedCarts[index].qty = qty
    setCarts(updatedCarts)
    await putData(`carts/${cartId.current}`, { products: updatedCarts, userId: id })
    calculateTotal()
  }

  const deleteProduct = async (productId: number) => {
    try {
      const updatedCarts = carts.filter((cart) => cart.productId !== productId)
      setCarts(updatedCarts)
      calculateTotal()
      const token = sessionStorage.getItem('token')
      const id = token ? Decode(token)?.id : undefined
      await putData(`carts/${cartId.current}`, { products: updatedCarts, userId: id })
      console.log(`Product with ID: ${productId} has been removed.`)
    } catch (error) {
      console.error('Error deleting product from cart:', error)
    }
  }
  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(10)
      setCouponCode('')
      setAlert('Đã áp dụng thành công mã giảm giá: DISCOUNT10')
      setAlertColor('text-green-500')
    } else {
      setDiscount(0)
      setAlert('Invalid coupon code')
      setAlertColor('text-red-500')
    }

    const newGrandTotal = subtotal + shipping - discount
    setGrandTotal(newGrandTotal)

    setTimeout(() => {
      setAlert('')
      setAlertColor('')
    }, 1500)
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const id = token ? Decode(token)?.id : undefined
    const getCarts = async () => {
      const carts = await getData('carts', { userId: id })
      if (carts.length > 0) {
        cartId.current = carts[0].id
        const updatedCarts = carts[0].products.map((product: Cart) => ({
          ...product
        }))
        setCarts(updatedCarts)
      }
    }
    getCarts()
  }, [])

  useEffect(() => {
    calculateTotal()
  }, [calculateTotal, carts])

  return (
    <>
      <div className='bg-cover py-20 font-raleway' style={{ backgroundImage: `url('${LoginImg}')` }}>
        <div className='container-custom'>
          <h2 className='group relative mb-8 inline-block pb-4 text-4xl font-medium'>
            {t('title')}
            <span className='absolute bottom-0 left-0 h-1 w-12 bg-black transition-all duration-300 ease-out group-hover:w-full' />
          </h2>
          <Breadcrumb />
        </div>
      </div>
      <div className='container-custom py-20'>
        <div>
          <table className='w-full font-raleway'>
            <thead>
              <tr className='flex w-full items-center border-b border-[#e9ecef] font-bold text-[#868e96]'>
                <th className='basis-1/3 p-3 text-justify'>{t('name')}</th>
                <th className='basis-1/6 p-3'>{t('unit_price')}</th>
                <th className='basis-1/6 p-3'>{t('qty')}</th>
                <th className='basis-1/6 p-3'>{t('subtotal')}</th>
                <th className='basis-1/6 p-3 text-right'>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, index) => (
                <tr key={index} className='flex w-full items-center border-b border-[#e9ecef]'>
                  <td className='basis-1/3 p-2 text-justify'>
                    <div className='flex items-center'>
                      <img src={cart.img} alt={cart.productName} className='mr-2 h-20 w-20 object-cover' />
                      <span className='font-bold'>{cart.productName}</span>
                    </div>
                  </td>
                  <td className='basis-1/6 p-2 text-center'>${cart.price}</td>
                  <td className='flex basis-1/6 justify-center p-3 text-center'>
                    <div className='flex w-[60%] items-center rounded-lg border border-gray-300'>
                      <button
                        className='flex h-10 w-10 items-center justify-center rounded-l-lg bg-gray-100 text-gray-600 shadow-sm hover:bg-gray-200 focus:outline-none'
                        onClick={() => updateQuantity(index, cart.qty - 1)}
                      >
                        -
                      </button>
                      <input
                        type='text'
                        value={cart.qty}
                        min={1}
                        className='w-16 rounded text-center focus:outline-none'
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                        onBlur={(e) => {
                          if (!e.target.value || parseInt(e.target.value) < 1) {
                            updateQuantity(index, 1)
                          }
                        }}
                      />
                      <button
                        className='flex h-10 w-10 items-center justify-center rounded-r-lg bg-gray-100 text-gray-600 shadow-sm hover:bg-gray-200 focus:outline-none'
                        onClick={() => updateQuantity(index, cart.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className='basis-1/6 p-2 text-center'>${(cart.price * cart.qty).toFixed(2)}</td>
                  <td className='basis-1/6 p-2 text-right'>
                    <button
                      className='rounded-md bg-red-500 px-3 py-1 text-white'
                      onClick={() => deleteProduct(cart.productId)}
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex flex-row space-x-4 py-16'>
          <div className='h-[200px] w-1/2 rounded-lg border border-black/20'>
            <h3 className='p-4'>Discount Codes</h3>
            <div className='border-t border-t-black/20 p-4'>
              <p className='mb-4 text-yellow-500'>Enter your coupon code if you have one.</p>
              <div className='flex'>
                <input
                  className='basis-2/3 border border-gray-400 p-3'
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className='basis-1/3 bg-black text-white' onClick={applyCoupon}>
                  Apply Coupon
                </button>
              </div>
              <p className={alertColor}>{alert}</p>
            </div>
          </div>
          <div className='w-1/2 rounded-lg border border-black/20'>
            <p className='p-4'>Shopping Cart Total</p>
            <div className='border-t border-t-black/20 px-4'>
              <div className='border-b border-b-black/20 py-4'>
                <div className='flex items-center justify-between'>
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
              </div>
              <div className='border-b border-b-black/20 py-4'>
                <div className='flex items-center justify-between'>
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
              </div>
              <div className='border-b border-b-black/20 py-4'>
                <div className='flex items-center justify-between'>
                  <p>Coupon Code</p>
                  <p>-${discount.toFixed(2)}</p>
                </div>
              </div>
              <div className='py-4'>
                <div className='flex items-center justify-between'>
                  <p>Grand Total</p>
                  <p>${grandTotal.toFixed(2)}</p>
                </div>
              </div>
              <button className='mb-4 w-full bg-black p-4 text-center text-white hover:bg-yellow-500'>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
