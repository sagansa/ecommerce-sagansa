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
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
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
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`featured-loading-${index}`}
              className="h-72 rounded-lg bg-white/60 border border-stone-200 animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg border border-red-200 p-8 text-center">
          <p className="text-red-600 font-semibold mb-3">
            {error}
          </p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-amber-800 text-white rounded-md shadow hover:bg-amber-900 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="bg-white rounded-lg border border-stone-200 p-8 text-center text-stone-500">
          Products will appear here once they are available.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
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
  };

  return (
    <div className="bg-stone-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800">Featured Collection</h2>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium ingredients, trusted by chefs and home cooks.
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default FeaturedCollection;
