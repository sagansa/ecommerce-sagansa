import React, { useState, useMemo, useEffect } from 'react';
import { CartItem } from '../types';
import { PAYMENT_METHODS, SHIPPING_METHODS } from '../constants';
import { CreditCardIcon, BanknotesIcon, WalletIcon } from '../components/icons';

interface CheckoutPageProps {
  cartItems: CartItem[];
}

const paymentIcons: { [key: string]: React.FC<{ className?: string }> } = {
  credit_card: CreditCardIcon,
  bank_transfer: BanknotesIcon,
  e_wallet: WalletIcon,
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems }) => {
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_METHODS[0].id);

  // State for address form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [saveAddress, setSaveAddress] = useState(true);

  useEffect(() => {
    const savedAddressData = localStorage.getItem('savedShippingAddress');
    if (savedAddressData) {
      try {
        const parsedAddress = JSON.parse(savedAddressData);
        setFullName(parsedAddress.fullName || '');
        setPhone(parsedAddress.phone || '');
        setAddress(parsedAddress.address || '');
        setCity(parsedAddress.city || '');
        setPostalCode(parsedAddress.postalCode || '');
      } catch (error) {
        console.error("Failed to parse saved address from localStorage", error);
        localStorage.removeItem('savedShippingAddress');
      }
    }
  }, []);

  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    const method = SHIPPING_METHODS.find(m => m.id === selectedShipping);
    return method ? method.price : 0;
  }, [subtotal, selectedShipping]);
  
  const total = subtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    if (saveAddress) {
      const shippingAddress = { fullName, phone, address, city, postalCode };
      localStorage.setItem('savedShippingAddress', JSON.stringify(shippingAddress));
    } else {
      localStorage.removeItem('savedShippingAddress');
    }

    alert('Thank you for your order! (This is a demo)');
    // In a real app, you would redirect to a success page and clear the cart
  };

  return (
    <div className="bg-stone-50">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-800 text-center mb-12">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-stone-800">Your cart is empty</h2>
            <p className="text-stone-600 mt-2">There's nothing to check out. Please add some items to your cart first.</p>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Shipping & Payment */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-stone-800 mb-6">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-stone-700">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-stone-700">Address</label>
                    <input type="text" id="address" name="address" required value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-stone-700">City / Area</label>
                    <input type="text" id="city" name="city" required value={city} onChange={e => setCity(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700" />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-stone-700">Postal Code</label>
                    <input type="text" id="postalCode" name="postalCode" required value={postalCode} onChange={e => setPostalCode(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700" />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <div className="flex items-center">
                      <input
                        id="save-address"
                        name="save-address"
                        type="checkbox"
                        checked={saveAddress}
                        onChange={e => setSaveAddress(e.target.checked)}
                        className="h-4 w-4 rounded border-stone-300 text-amber-800 focus:ring-amber-700"
                      />
                      <label htmlFor="save-address" className="ml-3 block text-sm font-medium text-stone-700">
                        Save this address for future orders
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-stone-800 mb-6">Delivery Method</h2>
                <div className="space-y-4">
                  {SHIPPING_METHODS.map(method => (
                     <label key={method.id} className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedShipping === method.id ? 'border-amber-700 bg-amber-50 ring-2 ring-amber-700' : 'border-stone-300'}`}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={selectedShipping === method.id}
                            onChange={() => setSelectedShipping(method.id)}
                            className="h-4 w-4 text-amber-800 focus:ring-amber-700 border-stone-300"
                          />
                          <div className="ml-4">
                            <span className="font-semibold text-stone-800">{method.name}</span>
                            <p className="text-sm text-stone-500">{method.estimatedDelivery}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-stone-800">{method.price > 0 ? `Rp ${method.price.toLocaleString('id-ID')}` : 'Free'}</span>
                      </label>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-stone-800 mb-6">Payment Method</h2>
                <div className="space-y-4">
                  {PAYMENT_METHODS.map(method => {
                    const Icon = paymentIcons[method.id];
                    return (
                      <label key={method.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedPayment === method.id ? 'border-amber-700 bg-amber-50 ring-2 ring-amber-700' : 'border-stone-300'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="h-4 w-4 text-amber-800 focus:ring-amber-700 border-stone-300"
                        />
                        <div className="ml-4 flex items-center">
                          {Icon && <Icon className="w-8 h-8 text-amber-800 mr-4" />}
                          <div>
                            <span className="font-semibold text-stone-800">{method.name}</span>
                            <p className="text-sm text-stone-500">{method.description}</p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-md sticky top-28">
                <h2 className="text-2xl font-semibold text-stone-800 mb-6">Order Summary</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-stone-800">{item.name}</p>
                        <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-stone-700 whitespace-nowrap">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-stone-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Delivery</span>
                    <span className="font-semibold">Rp {shippingCost.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-xl font-bold text-stone-800">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <button type="submit" className="w-full py-3 mt-6 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-300">
                  Place Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
