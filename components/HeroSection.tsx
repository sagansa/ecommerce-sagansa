
import React from 'react';

interface HeroSectionProps {
  onNavigateToShop: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToShop }) => {
  return (
    <div className="relative h-[60vh] min-h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974')" }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Premium Ingredients for Culinary Excellence
        </h2>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-stone-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
          Sourcing the finest raw materials for professional kitchens and passionate home cooks alike.
        </p>
        <button 
          onClick={onNavigateToShop}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-900 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Explore The Catalog
        </button>
      </div>
    </div>
  );
};

export default HeroSection;