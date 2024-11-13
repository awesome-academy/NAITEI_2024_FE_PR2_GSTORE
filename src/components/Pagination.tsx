import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PaginationProps } from '../types/pagination.type'

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1; // Mặc định là trang 1 nếu không có trong URL
    onPageChange(page);
  }, [location.search, onPageChange]);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);

    const params = new URLSearchParams(location.search);
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className="flex justify-center my-8 space-x-1">
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md hover:bg-gray-300 ${
          currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:text-black'
        }`}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 rounded-md ${
            page === currentPage
              ? 'bg-yellow-500 text-white font-bold' // Highlighted current page style
              : 'bg-gray-100 text-gray-600 hover:bg-gray-300' // Other pages style
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md hover:bg-gray-300 ${
          currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:text-black'
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
