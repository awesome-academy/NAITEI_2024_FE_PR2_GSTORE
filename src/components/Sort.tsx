import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {SortProps } from '../types/sort.type'

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const { t } = useTranslation('filter');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    onSortChange(sortOption);

    const params = new URLSearchParams(location.search);

    if (sortOption !== 'default') {
      params.set('sort', sortOption);
    } else {
      // Nếu giá trị là "default", thì loại bỏ "sort" khỏi URL
      params.delete('sort');
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortOption = params.get('sort') || 'default';
    onSortChange(sortOption);
  }, [location.search, onSortChange]);

  return (
    <div className="mb-4">
      <select
        id="sort"
        name="sort"
        value={new URLSearchParams(location.search).get('sort') || 'default'}
        onChange={handleSortChange}
        className="ml-2 border rounded p-1"
      >
        <option value="default">{t('filter.sort')}</option>
        <option value="priceAsc">{t('filter.sort-option1')}</option>
        <option value="priceDesc">{t('filter.sort-option2')}</option>
      </select>
    </div>
  );
};

export default Sort;
