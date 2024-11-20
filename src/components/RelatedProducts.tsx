import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import { Product } from '../types/product.type';
import ProductCard from './ProductCard';  // Tái sử dụng ProductCard để hiển thị từng sản phẩm
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

interface RelatedProductsProps {
  relatedProducts: Product[];
}

// Nút điều hướng tiếp theo
const CustomNextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowCircleRight size={24} />
    </div>
  );
};

// Nút điều hướng trước đó
const CustomPrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowCircleLeft size={24} />
    </div>
  );
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts }) => {
  const { t } = useTranslation('product');
  // Cấu hình cho slider
  const settings = {
    dots: true, // Hiển thị các dấu chấm chỉ định slide hiện tại
    infinite: true, // Vòng lặp vô hạn
    speed: 500, // Thời gian chuyển đổi giữa các slide
    slidesToShow: 4, // Số sản phẩm hiển thị trên mỗi slide
    slidesToScroll: 1, // Số sản phẩm cuộn khi bấm vào nút cuộn
    nextArrow: <CustomNextArrow />, // Sử dụng mũi tên tiếp theo tùy chỉnh
    prevArrow: <CustomPrevArrow />, // Sử dụng mũi tên trước đó tùy chỉnh
    responsive: [
      {
        breakpoint: 1024, // Với các màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // Với các màn hình nhỏ hơn 600px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Với các màn hình nhỏ hơn 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">{t('product.related-products')}</h2>
      {relatedProducts.length >= 4 ? (
        // Nếu có từ 4 sản phẩm trở lên, hiển thị dưới dạng slider
        <Slider {...settings}>
          {relatedProducts.map((product) => (
            <div key={product.id} className="p-2 mb-8">
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                prevPrice={product.prevPrice}
                discount={product.discount}
                rating={product.rating}
                img={product.img}
                searchTerm="" // Trong trường hợp này, bạn có thể bỏ qua searchTerm hoặc để trống
              />
            </div>
          ))}
        </Slider>
      ) : (
        // Nếu có ít hơn 4 sản phẩm, hiển thị danh sách sản phẩm thông thường
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <div key={product.id} className="p-2">
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                prevPrice={product.prevPrice}
                discount={product.discount}
                rating={product.rating}
                img={product.img}
                searchTerm="" // Trong trường hợp này, bạn có thể bỏ qua searchTerm hoặc để trống
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
