import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/product.type';
import HeaderBanner from '../layouts/HeaderBanner';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import RelatedProducts from '../components/RelatedProducts';
import { FaStar } from 'react-icons/fa6';
import { useWishlist } from '../components/WishlistContext';
import { toast } from 'react-toastify';

const ProductDetailPage: React.FC = () => {
  const { t } = useTranslation('product');
  const { addToWishlist } = useWishlist();
  const { id } = useParams<{ id: string }>(); // Nhận ID từ URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'description' | 'rates'>('description');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.img,
      });
      toast.success('Added to Wishlist!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (id) {
      // Nếu không có sản phẩm trong state hoặc cần tải lại
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/products/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
          }
          const productData: Product = await response.json();

          setProduct(productData);

          // Fetch các sản phẩm liên quan dựa trên category
          if (productData?.category) {
            const relatedResponse = await fetch(`http://localhost:5000/products?category=${productData.category}`);
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              setRelatedProducts(relatedData.filter((related: Product) => related.id !== productData.id));
            }
          }
        } catch (err) {
          setError(`Unable to load product details: ${err}`);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return <p>{t('product.loading-details')}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    // Nếu không tìm thấy sản phẩm
    return <p>{t('product.loading-failed')}</p>;
  }

  return (
    <div>
      <HeaderBanner title="Men Page" breadcrumb={['Home', 'Men', 'Clothes']} />
      <div className="container mx-auto my-8 space-y-12">
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {/* Hình ảnh sản phẩm với tính năng zoom */}
          <div className="w-full md:w-1/2">
            <Zoom>
              <img
                src={product.img}
                alt={product.title}
                className="w-auto h-96 object-cover m-auto"
              />
            </Zoom>
          </div>
          {/* Thông tin sản phẩm */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg text-gray-700 mb-2">${product.price.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              {/* Xếp hạng sản phẩm */}
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < Math.floor(product.rating.rate)
                      ? 'text-yellow-400 text-3xl'
                      : 'text-gray-300 text-3xl'
                  }
                />
              ))}
              <span className="text-gray-500 ml-2">({product.rating.count})</span>
            </div>
            <p className="mb-4 font-semibold">
             {t('product.Category')} : <span className="font-normal">{product.category}</span>
            </p>
            <p>
            <span className="font-normal">{product.description}</span>
            </p>
            <div className="flex gap-4 my-4">
              <button 
              onClick={handleAddToWishlist}
              className="px-4 py-2 border-2 border-gray-700 text-black font-semibold rounded hover:bg-gray-700 hover:text-white transition">
                <FaHeart className="inline mr-2" />
                {t('product.wishlist')}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <select className="border border-gray-300 rounded p-2">
                <option>Size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
            <div className="flex space-x-2">
            <input
                type="number"
                min="1"
                defaultValue="1"
                className="mt-2 border border-gray-300 w-20 rounded text-center"
              />
            <button className="mt-2 bg-white text-black text-base font-semibold w-2/3 py-2 border-2 rounded hover:bg-gray-600 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2">
          <span>{t('product.cart')}</span>
          <FaShoppingCart className="w-5 h-5" />
        </button>
            </div>
          </div>
        </div>

        {/* Tabs cho Description và Rates */}
        <div className="mt-8">
          <div className="border-b border-gray-300">
            <button
              className={`px-4 py-2 font-semibold ${activeTab === 'description' ? 'border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('description')}
            >
              {t('product.description')}
            </button>
            <button
              className={`ml-4 px-4 py-2 font-semibold ${activeTab === 'rates' ? 'border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('rates')}
            >
              {t('product.rate')}
            </button>
          </div>

          {/* Nội dung của các tab */}
          {activeTab === 'description' && (
            <div className="my-12">
              <p className="font-semibold mb-2">Material: <span className="font-normal">Lorem ipsum dolor</span></p>
              <p className="font-semibold mb-2">Shipping: <span className="font-normal">$20</span></p>
              <p className="font-semibold mb-2">Delivery: <span className="font-normal">Arrive within 30 days</span></p>
              <p className="font-semibold mb-2">Return Policy: <span className="font-normal">30 days return policy</span></p>
              <p className="mt-4">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === 'rates' && (
            <div className="my-12">
              <p className="text-gray-600">Customer ratings and reviews will be displayed here.</p>
              {/* Thêm phần đánh giá của khách hàng nếu cần */}
            </div>
          )}
        </div>
        {/* Thêm phần sản phẩm liên quan */}
        {relatedProducts.length > 0 && (
          <RelatedProducts relatedProducts={relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
