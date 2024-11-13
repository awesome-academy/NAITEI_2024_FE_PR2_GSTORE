export interface ProductProps {
  id: number;
  title: string;
  price: number;
  prevPrice?: string;
  discount?: number;
  rating: { rate: number; count: number };
  img: string;
  searchTerm: string;
}
