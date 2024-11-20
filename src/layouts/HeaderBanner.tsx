import React from 'react';
import image from '../assets/images/OIP.jpg'
import { HeaderBannerProps } from '../types/headerBanner.type';

const HeaderBanner: React.FC<HeaderBannerProps> = ({ title, breadcrumb }) => {
  return (
    <div className="bg-zinc-200 mb-8">
      <div className="container-fluid ml-12 mr-8 flex justify-between">
        <div className="pt-12">
        <h1 className="text-4xl font-bold pb-2 mb-4 border-b-2 border-black inline-block">{title}</h1>
        <div className="text-gray-500">
          {breadcrumb.map((crumb, index) => (
            <span key={index}>
              {index > 0 && ' / '}
              <span className={index === breadcrumb.length - 1 ? 'text-black' : ''}>{crumb}</span>
            </span>
          ))}
        </div>
        </div>
        <img
          src={image}
          alt='image'
          className ='rounded h-full w-auto'
        />
      </div>
    </div>
  );
};

export default HeaderBanner;
