import React from 'react';
import { useWishlist } from '../components/WishlistContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import HeaderBanner from '../layouts/HeaderBanner';

const Wishlist: React.FC = () => {
  const { t } = useTranslation('wishlist');
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemoveItem = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to remove this item?');
    if (confirm) {
      try {
        await removeFromWishlist(id);
        console.log(`Item with ID ${id} removed from wishlist`);
      } catch (error) {
        console.error('Failed to remove item from wishlist:', error);
      }
    }
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-gray-500">{t('wishlist.loading-wishlist')}</p>
        <Link
          to="/products"
          className="mt-4 inline-block px-6 py-2 border border-black text-black font-semibold rounded hover:bg-gray-600 hover:text-white transition-colors duration-300"
        >
          {t('wishlist.back')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <HeaderBanner title="Wishlist Page" breadcrumb={['Home', 'Wishlist']} />
      <div className="p-8">
        {/* Bảng cho màn hình lớn */}
        <div className="hidden md:block">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 border border-gray-300">{t('wishlist.product-name')}</th>
                <th className="p-4 border border-gray-300">{t('wishlist.unit-price')}</th>
                <th className="p-4 border border-gray-300">{t('wishlist.qty')}</th>
                <th className="p-4 border border-gray-300 text-center">{t('wishlist.cart')}</th>
                <th className="p-4 border border-gray-300 text-center">{t('wishlist.delete')}</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="p-4 border border-gray-300 flex items-center space-x-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => (e.currentTarget.src = '/path-to-placeholder.jpg')}
                    />
                    <div
                      className="text-lg font-semibold text-gray-800 truncate hover:text-amber-500 cursor-pointer"
                      title={item.title}
                    >
                      <span>{item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}</span>
                    </div>
                  </td>
                  <td className="p-4 border border-gray-300">${item.price}</td>
                  <td className="p-4 border border-gray-300">
                    <input
                      type="number"
                      defaultValue={1}
                      min={1}
                      className="w-16 border border-gray-300 rounded px-2 py-1"
                    />
                  </td>
                  <td className="p-4 border border-gray-300">
                    <button className="mt-2 bg-white text-black text-base font-semibold w-full py-2 border-2 rounded hover:bg-gray-600 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2">
                      <span>{t('wishlist.cart')}</span>
                      <FaShoppingCart className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="p-4 border border-gray-300 text-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Danh sách dạng card cho màn hình nhỏ */}
        <div className="md:hidden space-y-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => (e.currentTarget.src = '/path-to-placeholder.jpg')}
                />
                <div>
                  <h2
                    className="text-lg font-semibold text-gray-800 truncate"
                    title={item.title}
                  >
                    {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                  </h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="w-16 border border-gray-300 rounded px-2 py-1"
                />
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700">
                  <FaShoppingCart />
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="my-6 text-center">
          <Link
            to="/products"
            className="inline-block px-6 py-2 border border-black text-black font-semibold rounded hover:bg-gray-600 hover:text-white transition-colors duration-300"
          >
            {t('wishlist.shopping')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
