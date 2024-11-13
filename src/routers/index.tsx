// routers/index.tsx
import { useRoutes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import ProductList from '../page/ProductList'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/products', element: <ProductList /> }
      ]
    }
  ])
}
