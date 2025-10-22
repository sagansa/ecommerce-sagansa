// FIX: Implemented missing constants for products, payments, shipping, and mock orders.
import { Product, Order } from './types';

export const PRODUCTS: Product[] = [
  { id: 'sample-coffee-beans', name: 'Sumatra Mandheling Coffee Beans', description: 'Rich, full-bodied coffee beans with low acidity and notes of chocolate and earth. Perfect for espresso and dark roasts. Sourced directly from Aceh.', price: 250000, imageUrl: null, category: 'Coffee Beans' },
  { id: 'sample-bread-flour', name: 'Artisanal Bread Flour (T45)', description: 'High-protein French-style flour, ideal for creating baguettes, croissants, and other viennoiserie with a light, airy texture.', price: 85000, imageUrl: null, category: 'Flour & Grains' },
  { id: 'sample-vanilla-beans', name: 'Madagascar Vanilla Beans (Grade A)', description: 'Plump, oily, and aromatic vanilla beans with a creamy, sweet flavor profile. Essential for high-quality desserts and infusions.', price: 150000, imageUrl: null, category: 'Spices' },
  { id: 'sample-coconut-sugar', name: 'Organic Coconut Sugar', description: 'An unrefined, natural sweetener with a lower glycemic index and a subtle caramel flavor. Excellent for baking and beverages.', price: 60000, imageUrl: null, category: 'Sweeteners' },
  { id: 'sample-cacao-nibs', name: 'Single-Origin Cacao Nibs', description: 'Fermented, dried, and roasted cacao beans. Offers intense, unsweetened chocolate flavor and a crunchy texture for culinary applications.', price: 120000, imageUrl: null, category: 'Chocolate' },
  { id: 'sample-pink-salt', name: 'Himalayan Pink Salt (Coarse)', description: 'Unrefined, mineral-rich salt harvested from the Khewra Salt Mine. Ideal for finishing dishes, curing, and brining.', price: 45000, imageUrl: null, category: 'Spices' },
  { id: 'sample-italian-flour', name: 'Italian "00" Flour', description: 'Finely milled soft wheat flour, the gold standard for authentic Neapolitan pizza and fresh pasta with a silky texture.', price: 95000, imageUrl: null, category: 'Flour & Grains' },
  { id: 'sample-kampot-pepper', name: 'Kampot Black Peppercorns', description: 'A globally renowned peppercorn from Cambodia with a complex flavor profile that is both spicy and floral. A must-have for professional kitchens.', price: 180000, imageUrl: null, category: 'Spices' },
];

export const PAYMENT_METHODS = [
    { id: 'credit_card', name: 'Credit / Debit Card', description: 'Pay with Visa, Mastercard, or Amex.' },
    { id: 'bank_transfer', name: 'Bank Transfer', description: 'Pay via virtual account.' },
    { id: 'e_wallet', name: 'E-Wallet', description: 'Pay with GoPay, OVO, or Dana.' },
];

export const SHIPPING_METHODS = [
    { id: 'standard', name: 'Standard Delivery', estimatedDelivery: '2-3 business days', price: 15000 },
    { id: 'express', name: 'Express Delivery', estimatedDelivery: '1 business day', price: 25000 },
    { id: 'instant', name: 'Instant Delivery', estimatedDelivery: '2-3 hours', price: 40000 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'GH-12345',
    date: '2023-10-26',
    items: [
      { ...PRODUCTS[0], quantity: 2 }, // Coffee Beans
      { ...PRODUCTS[1], quantity: 5 }, // Bread Flour
    ],
    total: 925000,
    status: 'Delivered',
  },
  {
    id: 'GH-12346',
    date: '2023-11-15',
    items: [
      { ...PRODUCTS[2], quantity: 1 }, // Vanilla Beans
      { ...PRODUCTS[4], quantity: 3 }, // Cacao Nibs
    ],
    total: 510000,
    status: 'Shipped',
  },
    {
    id: 'GH-12347',
    date: '2024-01-05',
    items: [
      { ...PRODUCTS[6], quantity: 10 }, // "00" Flour
    ],
    total: 950000,
    status: 'Processing',
  },
];
