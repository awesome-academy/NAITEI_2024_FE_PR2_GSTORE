import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  img: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Fetch wishlist từ db.json khi khởi động
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:5000/wishlist');
        if (!response.ok) {
          throw new Error(`Failed to fetch wishlist: ${response.statusText}`);
        }
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  // Thêm sản phẩm vào wishlist và lưu vào db.json
  const addToWishlist = async (item: WishlistItem) => {
    try {
      const existingItem = wishlist.find((wishlistItem) => wishlistItem.id === item.id);
      if (existingItem) {
        console.log('Item already in wishlist');
        return;
      }

      const response = await fetch('http://localhost:5000/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`Failed to add to wishlist: ${response.statusText}`);
      }

      const data = await response.json();
      setWishlist((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  // Xóa sản phẩm khỏi wishlist và db.json
  const removeFromWishlist = async (id: number) => {
    console.log(`Attempting to delete item with ID: ${id}`);
    try {
      const response = await fetch(`http://localhost:5000/wishlist/${id}`, {
        method: 'DELETE',
      });
  
      console.log(`Response status: ${response.status}`);
      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }
  
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      console.log(`Item with ID ${id} removed`);
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };
  

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
