import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  prevPrice?: string; // Cập nhật kiểu cho phù hợp với dữ liệu của bạn
  discount?: number;
  rating: { rate: number; count: number };
  img: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(`Không thể tải dữ liệu sản phẩm: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center">Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex container">
      <div className="w-1/4">
      ...
      </div>
      <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
    </div>
  );
};

export default ProductList;
