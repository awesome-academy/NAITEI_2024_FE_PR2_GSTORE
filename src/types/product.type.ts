export interface Product {
  id: number;
  title: string;
  price: number;
  prevPrice?: string; // Optional: Giá cũ (có thể không có)
  discount?: number; // Optional: Giảm giá (có thể không có)
  rating: {
    rate: number;
    count: number;
  };
  img: string;
  category: string;
  company: string;
  description: string; // Optional:
}
