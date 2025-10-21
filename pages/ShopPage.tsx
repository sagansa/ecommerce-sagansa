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
}

const ShopPage: React.FC<ShopPageProps> = ({ products, user, onAddToCart, onViewDetails, onToggleWishlist, wishlistItems }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

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
      </div>
    </div>
  );
};

export default ShopPage;