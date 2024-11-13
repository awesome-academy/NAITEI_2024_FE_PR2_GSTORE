import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PaginationOptionProps {
  onHitsPerPageChange: (hitsPerPage: number) => void;
}

const PaginationOption: React.FC<PaginationOptionProps> = ({ onHitsPerPageChange }) => {
  const { t } = useTranslation('filter');
  const navigate = useNavigate();
  const location = useLocation();

  // Khi component mount, lấy giá trị từ URL và cập nhật trạng thái ban đầu
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hitsPerPageParam = params.get('hitsPerPage');
    const hitsPerPage = hitsPerPageParam ? parseInt(hitsPerPageParam, 10) : 16; // Mặc định là 16 nếu không có trong URL
    onHitsPerPageChange(hitsPerPage);
  }, [location.search, onHitsPerPageChange]);

  const handleHitsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const hitsPerPage = parseInt(event.target.value, 10);
    onHitsPerPageChange(hitsPerPage);

    const params = new URLSearchParams(location.search);
    if (hitsPerPage !== 16) {
      params.set('hitsPerPage', hitsPerPage.toString());
    } else {
      params.delete('hitsPerPage');
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className="mb-4">
      <select
        id="hitsPerPage"
        name="hitsPerPage"
        value={new URLSearchParams(location.search).get('hitsPerPage') || '16'} // Lấy giá trị từ URL hoặc mặc định là 16
        onChange={handleHitsChange}
        className="ml-2 border rounded p-1 text-center"
      >
        <option value="16">{t('filter.page-option1')}</option>
        <option value="32">{t('filter.page-option2')}</option>
        <option value="64">{t('filter.page-option3')}</option>
      </select>
    </div>
  );
};

export default PaginationOption;
