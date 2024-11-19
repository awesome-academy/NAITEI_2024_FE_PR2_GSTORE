import React from 'react';
import { FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { ProductProps } from '../types/productCard.type';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { toast } from 'react-toastify';

const ProductCard: React.FC<ProductProps> = ({ id, title, price, prevPrice, discount, rating, img, searchTerm }) => {
  const { t } = useTranslation('product');
  const { addToWishlist } = useWishlist();

  // Xử lý làm nổi bật từ khóa trong tiêu đề
  const highlightTitle = (title: string, searchTerm: string) => {
    if (!searchTerm) return title;
    const parts = title.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? <strong key={index} className="text-amber-500">{part}</strong> : part
    );
  };

  const handleAddToWishlist = () => {
    addToWishlist({ id, title, price, img }); // Thêm sản phẩm vào wishlist
    toast.success('Added to Wishlist!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="relative group">
        {discount && discount > 0 ? (
          <span className="flex absolute top-3 left-3 bg-red-500 text-white text-lg font-semibold w-12 h-12 rounded-full justify-center items-center">
            -{discount}%
          </span>
        ) : (
          <span hidden></span>
        )}

        {/* Hình ảnh sản phẩm */}
        <img src={img} alt={title} className="w-auto m-auto h-72 bg-cover" />

        {/* Hiển thị nút Add to Wishlist khi hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white py-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToWishlist}
            className="text-white font-semibold text-base flex items-center m-auto justify-center space-x-2">
            <span>{t('product.wishlist')}</span>
            <FaHeart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 text-center">
        {/* Tên sản phẩm */}
        <Link to={`/product/${id}`} state={{ id, title, price, prevPrice, discount, rating, img }} className="block">
          <h2 className="text-lg font-semibold text-gray-800 truncate hover:text-amber-500 cursor-pointer" title={title}>
            {highlightTitle(title, searchTerm)}
          </h2>
        </Link>

        {/* Giá sản phẩm */}
        <div className="flex items-center justify-center space-x-2 my-2">
          <span className="text-base font-semibold text-gray-800">${price}</span>
          {prevPrice && <span className="text-sm text-gray-400 line-through">{prevPrice}</span>}
        </div>

        {/* Xếp hạng sản phẩm */}
        <div className="flex items-center justify-center mb-2">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className={
                index < Math.floor(rating.rate)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }
            />
          ))}
          <span className="text-gray-400 ml-1">({rating.count})</span>
        </div>

        {/* Nút thêm vào giỏ hàng */}
        <button className="mt-2 bg-white text-black text-base font-semibold w-full py-2 border-2 rounded hover:bg-gray-600 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2">
          <span>{t('product.cart')}</span>
          <FaShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
