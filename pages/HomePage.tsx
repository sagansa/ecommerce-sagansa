import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedCollection from '../components/FeaturedCollection';
import { Product, User } from '../types';

interface HomePageProps {
  products: Product[];
  user: User | null;
  onNavigateToShop: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
  productsLoading: boolean;
  productsError: string | null;
  onReloadProducts: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  products, 
  user,
  onNavigateToShop, 
  onAddToCart, 
  onViewDetails,
  onToggleWishlist,
  wishlistItems,
  productsLoading,
  productsError,
  onReloadProducts,
}) => {
  const featuredProducts = products.slice(0, 4); // Show first 4 products as featured

  return (
    <main>
      <HeroSection onNavigateToShop={onNavigateToShop} />
      <FeaturedCollection 
        products={featuredProducts} 
        user={user}
        onAddToCart={onAddToCart}
        onViewDetails={onViewDetails}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
        isLoading={productsLoading}
        error={productsError}
        onRetry={onReloadProducts}
      />
    </main>
  );
};

export default HomePage;
