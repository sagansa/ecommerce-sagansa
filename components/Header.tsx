
import React from 'react';
import { ShoppingBagIcon, UserIcon, HeartIcon } from './icons';
import { User } from '../types';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onCartClick: () => void;
  onAuthClick: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  cartItemCount: number;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onCartClick, onAuthClick, onLogout, cartItemCount, user }) => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="text-3xl font-bold text-amber-900 tracking-tight">
            Golden Harvest
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className="text-stone-700 hover:text-amber-800 font-medium transition-colors">Home</button>
            <button onClick={() => onNavigate('shop')} className="text-stone-700 hover:text-amber-800 font-medium transition-colors">Shop</button>
            <button onClick={() => onNavigate('about')} className="text-stone-700 hover:text-amber-800 font-medium transition-colors">About</button>
            <button onClick={() => onNavigate('contact')} className="text-stone-700 hover:text-amber-800 font-medium transition-colors">Contact</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="group relative">
                <button onClick={() => onNavigate('profile')} className="flex items-center space-x-2 text-stone-700 hover:text-amber-800">
                  <UserIcon className="w-6 h-6" />
                  <span className="hidden lg:inline font-medium">{user.name}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <button onClick={() => onNavigate('profile')} className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">My Profile</button>
                  <button onClick={() => onNavigate('orders')} className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">Order History</button>
                  <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">Logout</button>
                </div>
              </div>
            ) : (
              <button onClick={() => onAuthClick('login')} className="hidden md:flex items-center space-x-2 text-stone-700 hover:text-amber-800">
                <UserIcon className="w-6 h-6" />
                <span className="font-medium">Login</span>
              </button>
            )}
            
            {user && (
                 <button onClick={() => onNavigate('wishlist')} className="relative text-stone-700 hover:text-amber-800">
                    <HeartIcon className="w-6 h-6" />
                </button>
            )}

            <button onClick={onCartClick} className="relative text-stone-700 hover:text-amber-800">
              <ShoppingBagIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
