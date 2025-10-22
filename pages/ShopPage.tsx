import React, { useState } from 'react';
import { Product, User } from '../types';
import ProductCard from '../components/ProductCard';

interface ShopPageProps {
  products: Product[];
  user: User | null;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const ShopPage: React.FC<ShopPageProps> = ({
  products,
  user,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  wishlistItems,
  isLoading,
  error,
  onRetry,
}) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

    let content: React.ReactNode;

    if (isLoading) {
      content = (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`shop-loading-${index}`}
              className="h-80 rounded-lg bg-white/60 border border-stone-200 animate-pulse"
            />
          ))}
        </div>
      );
    } else if (error) {
      content = (
        <div className="bg-white border border-red-200 rounded-lg p-8 text-center">
          <p className="text-red-600 font-semibold mb-3">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-amber-800 text-white rounded-md shadow hover:bg-amber-900 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    } else if (filteredProducts.length === 0) {
      content = (
        <div className="bg-white border border-stone-200 rounded-lg p-8 text-center text-stone-500">
          {products.length === 0
            ? 'Products will appear here once they are available.'
            : 'No products match the selected category.'}
        </div>
      );
    } else {
      content = (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              user={user}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlistItems.some(item => item.id === product.id)}
            />
          ))}
        </div>
      );
    }

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Our Catalog</h1>
          <p className="mt-4 text-lg text-stone-600">Browse our entire collection of premium ingredients.</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-full shadow-sm">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  filter === category
                    ? 'bg-amber-800 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {content}
      </div>
    </div>
  );
};

export default ShopPage;
