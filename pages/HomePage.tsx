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
}

const HomePage: React.FC<HomePageProps> = ({ 
  products, 
  user,
  onNavigateToShop, 
  onAddToCart, 
  onViewDetails,
  onToggleWishlist,
  wishlistItems
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
      />
    </main>
  );
};

export default HomePage;