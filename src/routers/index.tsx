// routers/index.tsx
import { useRoutes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import ProductList from '../page/ProductList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Cart from '../pages/Cart'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/products', element: <ProductList /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/cart', element: <Cart /> }
      ]
    }
  ])
}
