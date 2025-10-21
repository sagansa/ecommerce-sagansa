import React from 'react';
import { CartItem } from '../types';
import { PlusIcon, MinusIcon, TrashIcon, XMarkIcon, ShoppingBagIcon } from './icons';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onNavigateToShop: () => void;
  onProceedToCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onNavigateToShop, onProceedToCheckout }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-stone-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-stone-200">
            <h2 className="text-2xl font-bold text-stone-800">Your Order</h2>
            <button onClick={onClose} className="text-stone-500 hover:text-amber-800 transition-colors">
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-6 space-y-4">
              <ShoppingBagIcon className="w-24 h-24 text-stone-300" />
              <h3 className="text-xl font-bold text-stone-800">Your Cart is Empty</h3>
              <p className="text-stone-500 max-w-xs">
                Time to explore our catalog and find the perfect ingredients.
              </p>
              <button
                onClick={onNavigateToShop}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-900 font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-stone-800">{item.name}</h3>
                    <p className="text-sm text-stone-500">Rp {item.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full border border-stone-300 hover:bg-stone-100 disabled:opacity-50"
                        disabled={item.quantity === 1}
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="w-4 h-4 text-stone-600" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        aria-label={`Quantity for ${item.name}`}
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          if (!isNaN(newQuantity) && newQuantity > 0) {
                            onUpdateQuantity(item.id, newQuantity);
                          }
                        }}
                        onBlur={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          if (isNaN(newQuantity) || newQuantity < 1) {
                            onUpdateQuantity(item.id, 1);
                          }
                        }}
                        className="w-12 mx-1 text-center border-0 border-b-2 border-stone-200 focus:border-amber-700 focus:ring-0 bg-transparent text-stone-700 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                      />
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full border border-stone-300 hover:bg-stone-100"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end pl-4">
                    <p className="font-bold text-stone-800 whitespace-nowrap">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    <button onClick={() => onRemoveItem(item.id)} className="text-stone-400 hover:text-red-500 transition-colors mt-2">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-stone-600">Subtotal</span>
                <span className="text-2xl font-bold text-stone-800">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <button 
                onClick={onProceedToCheckout}
                className="w-full py-3 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-300"
              >
                Continue to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;