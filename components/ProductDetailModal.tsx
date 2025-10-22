import React, { useState } from 'react';
import { Product, User } from '../types';
import { XMarkIcon, PlusIcon, MinusIcon, HeartIcon } from './icons';

interface ProductDetailModalProps {
  product: Product | null;
  user: User | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, user, onClose, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }
  
  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-stone-500 hover:text-amber-800 transition-colors z-10"
          aria-label="Close"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>
        <div className="w-full md:w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 md:h-full object-cover"/>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <p className="text-sm font-semibold text-amber-700">{product.category}</p>
          <div className="flex justify-between items-start mt-2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800">{product.name}</h2>
            {user && (
              <button
                onClick={() => onToggleWishlist(product)}
                className={`flex-shrink-0 ml-4 p-2 rounded-full bg-stone-100 shadow-sm transition-colors ${isInWishlist ? 'text-red-500' : 'text-stone-500 hover:text-red-500'}`}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <HeartIcon className={`w-7 h-7 ${isInWishlist ? 'fill-current' : 'fill-none'}`} />
              </button>
            )}
          </div>
          <p className="text-3xl font-bold text-stone-900 mt-4">Rp {product.price.toLocaleString('id-ID')}</p>
          <div className="mt-6 border-t border-stone-200 pt-6">
            <h3 className="font-semibold text-stone-800">Description</h3>
            <p className="text-stone-600 mt-2">{product.description}</p>
          </div>
          <div className="mt-auto pt-6">
            <div className="flex items-center space-x-4 mb-6">
              <span className="font-semibold text-stone-800">Quantity</span>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 rounded-full border border-stone-300 hover:bg-stone-100 disabled:opacity-50"
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-5 h-5 text-stone-600" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-16 text-center border-0 focus:ring-0 bg-transparent text-stone-700 font-bold text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label={`Quantity for ${product.name}`}
                />
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 rounded-full border border-stone-300 hover:bg-stone-100"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-5 h-5 text-stone-600" />
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCartClick}
              className="w-full py-4 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-300 text-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;