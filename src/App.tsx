import { Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './page/Home';
import ProductList from './page/ProductList'; 

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route cho trang Home */}
          <Route path="/products" element={<ProductList />} /> {/* Route cho trang ProductList */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
