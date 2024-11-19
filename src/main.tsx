import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './i18n/i18n.ts';
import { BrowserRouter } from 'react-router-dom';
import { WishlistProvider } from './components/WishlistContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <WishlistProvider>
      <App />
      <ToastContainer /> {/* Thêm ToastContainer */}
    </WishlistProvider>
  </BrowserRouter>
);
