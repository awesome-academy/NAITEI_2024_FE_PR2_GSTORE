import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaSearch, FaStar } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useDebounce from '../useDebounce/useDebounce';
import { FilterProps } from '../types/filter.type';

const Filter: React.FC<FilterProps> = ({ onFilterChange, categories, companies }) => {
  const { t } = useTranslation('filter');
  const navigate = useNavigate();
  const location = useLocation();

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debounceSearchTerm = useDebounce(searchTerm, 300);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const priceMin = params.get('priceMin');
    const priceMax = params.get('priceMax');
    const category = params.get('category');
    const company = params.get('company');
    const ratingParam = params.get('rating');
    const search = params.get('search');

    if (priceMin && priceMax && (priceMin !== '0' || priceMax !== '4000')) {
      setPriceRange([Number(priceMin), Number(priceMax)]);
    } else {
      setPriceRange([0, 4000]);
    }
    setSelectedCategory(category || null);
    setSelectedCompany(company || null);
    setRating(ratingParam ? Number(ratingParam) : null);
    setSearchTerm(search || '');
  }, [location.search]);

  // Debounce
  useEffect(() => {
    updateFilters({ priceRange, selectedCategory, selectedCompany, rating, searchTerm });
  }, [priceRange, selectedCategory, selectedCompany, rating, searchTerm]);

  const updateFilters = (newFilters: any) => {
    onFilterChange(newFilters);

    const params = new URLSearchParams(location.search);
    if (!(newFilters.priceRange[0] === 0 && newFilters.priceRange[1] === 4000)) {
      params.set('priceMin', newFilters.priceRange[0].toString());
      params.set('priceMax', newFilters.priceRange[1].toString());
    } else {
      params.delete('priceMin');
      params.delete('priceMax');
    }
    if (newFilters.selectedCategory) {
      params.set('category', newFilters.selectedCategory);
    } else {
      params.delete('category');
    }
    if (newFilters.selectedCompany) {
      params.set('company', newFilters.selectedCompany);
    } else {
      params.delete('company');
    }
    if (newFilters.rating) {
      params.set('rating', newFilters.rating.toString());
    } else {
      params.delete('rating');
    }
    if (newFilters.searchTerm) {
      params.set('search', newFilters.searchTerm);
    } else {
      params.delete('search');
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleClearFilters = () => {
    if (!isClearDisabled()) {
      setPriceRange([0, 4000]);
      setSelectedCategory(null);
      setSelectedCompany(null);
      setRating(null);
      setSearchTerm('');

      onFilterChange({
        priceRange: [0, 4000],
        selectedCategory: null,
        selectedCompany: null,
        rating: null,
        searchTerm: '',
      });

      // Chỉ xóa các tham số filter khỏi URL
      const params = new URLSearchParams(location.search);
      params.delete('priceMin');
      params.delete('priceMax');
      params.delete('category');
      params.delete('company');
      params.delete('rating');
      params.delete('search');
      navigate(`?${params.toString()}`, { replace: true });
    }
  };

  // Kiểm tra nếu tất cả các giá trị bộ lọc đều ở mặc định
  const isClearDisabled = () => {
    return (
      priceRange[0] === 0 &&
      priceRange[1] === 4000 &&
      !selectedCategory &&
      !selectedCompany &&
      !rating &&
      !searchTerm
    );
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const [minValue, maxValue] = value;
      if (maxValue >= minValue) {
        setPriceRange([minValue, maxValue]);
      }
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleCompanyChange = (company: string | null) => {
    setSelectedCompany(company);
  };

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{t('filter.title')}</h2>
        <div
          className={`flex text-center items-center ${isClearDisabled() ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'
            }`}
          onClick={handleClearFilters}
        >
          <img
            className="w-4 h-4"
            src="/filter-reset.svg"
            alt="reset icon"
            style={{ pointerEvents: isClearDisabled() ? 'none' : 'auto' }}
          />
          {t('filter.clear-filter')}
        </div>
      </div>

      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder={t('filter.search-products')}
          value={debounceSearchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 pl-10 border border-gray-300 rounded"
        />
      </div>

      <h2 className="text-lg font-semibold mb-4">{t('filter.filter-price')}</h2>
      <div className="mb-4">
        <Slider
          range
          min={0}
          max={4000}
          value={priceRange}
          onChange={handlePriceChange}
          trackStyle={[{ backgroundColor: 'rgb(234 179 8)' }]}
          handleStyle={[
            { backgroundColor: 'rgb(234 179 8)', borderColor: 'rgb(234 179 8)' },
            { backgroundColor: 'rgb(234 179 8)', borderColor: 'rgb(234 179 8)' },
          ]}
          allowCross={false} // Prevent handles from crossing
        />
        <div className="flex justify-between text-sm mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-4">
        <h2
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          {t('filter.category')}
          <span>{isCategoryOpen ? '▲' : '▼'}</span>
        </h2>
        {isCategoryOpen && (
          <div className="flex flex-col space-y-2 max-h-80 overflow-y-auto">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`text-left p-2 rounded ${!selectedCategory ? 'text-amber-500 font-bold' : 'hover:text-amber-500'}`}
            >
              {t('filter.all')}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-left p-2 rounded ${selectedCategory === category ? 'text-amber-500 font-bold' : 'hover:text-amber-500'}`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setIsCompanyOpen(!isCompanyOpen)}
        >
          {t('filter.company')}
          <span>{isCompanyOpen ? '▲' : '▼'}</span>
        </h2>
        {isCompanyOpen && (
          <div className="flex flex-col space-y-2 max-h-80 overflow-y-auto">
            <button
              onClick={() => handleCompanyChange(null)}
              className={`text-left p-2 rounded ${!selectedCompany ? 'text-amber-500 font-bold' : 'hover:text-amber-500'}`}
            >
              {t('filter.all')}
            </button>
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => handleCompanyChange(company)}
                className={`text-left p-2 rounded ${selectedCompany === company ? 'text-amber-500 font-bold' : 'hover:text-amber-500'}`}
              >
                {company}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-4">{t('filter.rating')}</h3>
        <ul className="space-y-4">
          {[5, 4, 3, 2, 1].map((star) => (
            <li key={star}>
              <button
                className="flex items-center"
                onClick={() => handleRatingChange(star)}
              >
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`w-6 h-6 mr-1 ${index < star ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
