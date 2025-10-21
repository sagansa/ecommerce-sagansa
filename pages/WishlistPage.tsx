import React from 'react';
import { Product, User } from '../types';
import ProductCard from '../components/ProductCard';
import { HeartIcon } from '../components/icons';

interface WishlistPageProps {
  wishlistItems: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigateToShop: () => void;
  user: User | null;
}

const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistItems,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  onNavigateToShop,
  user
}) => {
  if (!user) {
    return (
      <div className="py-16 bg-stone-50 min-h-[60vh]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-stone-800">My Wishlist</h1>
          <p className="mt-4 text-lg text-stone-600">Please log in to view your wishlist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-stone-50 min-h-[60vh]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Your Wishlist</h1>
          <p className="mt-4 text-lg text-stone-600">Your collection of favorite ingredients.</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md max-w-2xl mx-auto">
            <HeartIcon className="w-24 h-24 text-stone-300 mx-auto" />
            <h2 className="text-2xl font-semibold text-stone-800 mt-4">Your Wishlist is Empty</h2>
            <p className="text-stone-600 mt-2">
              Explore our products and click the heart icon to save your favorites here.
            </p>
            <button
                onClick={onNavigateToShop}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-900 font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Start Shopping
              </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistItems.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                user={user}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={true} // All items on this page are in the wishlist
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
