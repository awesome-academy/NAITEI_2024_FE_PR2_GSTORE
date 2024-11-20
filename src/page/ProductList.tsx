import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import PaginationOption from '../components/PaginationOption';
import { useTranslation } from 'react-i18next';
import { Product } from '../types/product.type';
import HeaderBanner from '../layouts/HeaderBanner';

const ProductList: React.FC = () => {
  const { t } = useTranslation('product');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hitsPerPage, setHitsPerPage] = useState<number>(16);

  const [filters, setFilters] = useState({
    searchTerm: '',
    priceRange: [0, 4000] as [number, number],
    selectedCategory: '',
    selectedCompany: '',
    rating: null as number | null,
    sortOption: 'default',
  });

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(`Unable to load product data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle filter change and update filtered products
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);

    const filtered = products.filter((product) => {
      const matchesSearchTerm = product.title.toLowerCase().includes(newFilters.searchTerm.toLowerCase());
      const withinPriceRange = product.price >= newFilters.priceRange[0] && product.price <= newFilters.priceRange[1];
      const matchesCategory = newFilters.selectedCategory ? product.category === newFilters.selectedCategory : true;
      const matchesCompany = newFilters.selectedCompany ? product.company === newFilters.selectedCompany : true;
      const meetsRating = newFilters.rating ? Math.floor(product.rating.rate) === newFilters.rating : true;

      return matchesSearchTerm && withinPriceRange && matchesCategory && matchesCompany && meetsRating;
    });

    let sortedProducts = [...filtered];
    if (newFilters.sortOption === 'priceAsc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (newFilters.sortOption === 'priceDesc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  // Handle page change
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  // Handle hits per page change
  const handleHitsPerPageChange = (hits: number) => {
    setHitsPerPage(hits);
    setCurrentPage(1); // Reset to the first page when changing hits per page
  };

  // Calculate the products to display based on current page and hitsPerPage
  const startIdx = (currentPage - 1) * hitsPerPage;
  const endIdx = startIdx + hitsPerPage;
  const currentProducts = filteredProducts.slice(startIdx, endIdx);
  const pageCount = Math.ceil(filteredProducts.length / hitsPerPage);

  if (loading) {
    return <p className="text-center">{t('product.loading')}</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Use HeaderBanner Component */}
      <HeaderBanner title="Men Page" breadcrumb={['Home', 'Men']} />
      <div className="flex flex-wrap md:flex-nowrap content-normal p-8 space-x-8">
      <div className="w-full md:w-1/4">
        <Filter
          onFilterChange={handleFilterChange}
          categories={[...new Set(products.map((product) => product.category))]}
          companies={[...new Set(products.map((product) => product.company))]}
        />
      </div>
      <div className="w-full md:w-3/4 space-y-4">
        <div className="flex flex-wrap md:flex-nowrap justify-end items-center">
          <Sort onSortChange={(sortOption) => handleFilterChange({ ...filters, sortOption })} />
          <PaginationOption onHitsPerPageChange={handleHitsPerPageChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} {...product} searchTerm={filters.searchTerm} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={pageCount} onPageChange={handlePageChange} />
      </div>
    </div>
    </div>
  );
};

export default ProductList;
