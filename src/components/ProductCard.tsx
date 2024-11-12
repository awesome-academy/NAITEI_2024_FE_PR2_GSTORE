import React from 'react';
import { FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    prevPrice?: string;
    discount?: number;
    rating: { rate: number; count: number };
    img: string;
}

const ProductCard: React.FC<ProductProps> = ({ title, price, prevPrice, discount, rating, img }) => {
    // Xử lý làm tròn rating
    const fullStars = Math.floor(rating.rate); // Số ngôi sao đầy
    const hasHalfStar = rating.rate - fullStars >= 0.5; // Kiểm tra nếu có nửa sao

    return (
        <div className="relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="relative group">
                {/* Badge giảm giá chỉ hiển thị nếu discount > 0 */}
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
                    <button className="text-white font-semibold text-base flex items-center m-auto justify-center space-x-2">
                        <span>Add To WishList</span>
                        <FaHeart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="p-4 text-center">
                {/* Tên sản phẩm */}
                <h2 className="text-lg font-semibold text-gray-800 truncate hover:text-amber-500 cursor-pointer" title={title}>
                    {title}
                </h2>

                {/* Giá sản phẩm */}
                <div className="flex items-center justify-center space-x-2 my-2">
                    <span className="text-base font-semibold text-gray-800">${price}</span>
                    {prevPrice && (
                        <span className="text-sm text-gray-400 line-through">{prevPrice}</span>
                    )}
                </div>

                {/* Xếp hạng sản phẩm */}
                <div className="flex items-center justify-center mb-2">
                    {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                            key={index}
                            className={
                                index < fullStars
                                    ? 'text-yellow-400'
                                    : hasHalfStar && index === fullStars
                                        ? 'text-yellow-300'
                                        : 'text-gray-300'
                            }
                        />
                    ))}
                    <span className="text-gray-400 ml-1">({rating.count})</span>
                </div>

                {/* Nút thêm vào giỏ hàng */}
                <button className="mt-2 bg-white text-black text-base font-semibold w-full py-2 border-2 rounded hover:bg-gray-600 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2">
                    <span>ADD TO CART</span>
                    <FaShoppingCart className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
