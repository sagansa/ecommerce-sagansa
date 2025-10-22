import React from 'react';
import { Product, User } from '../types';
import ProductCard from './ProductCard';

interface FeaturedCollectionProps {
  products: Product[];
  user: User | null;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ products, user, onAddToCart, onViewDetails, onToggleWishlist, wishlistItems }) => {
  return (
    <div className="bg-stone-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800">Featured Collection</h2>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium ingredients, trusted by chefs and home cooks.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
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

export default FeaturedCollection;