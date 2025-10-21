// FIX: Implemented missing constants for products, payments, shipping, and mock orders.
import { Product, Order } from './types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Sumatra Mandheling Coffee Beans', description: 'Rich, full-bodied coffee beans with low acidity and notes of chocolate and earth. Perfect for espresso and dark roasts. Sourced directly from Aceh.', price: 250000, imageUrl: 'https://images.unsplash.com/photo-1599639942233-25c27598ad5e?q=80&w=1770', category: 'Coffee Beans' },
  { id: 2, name: 'Artisanal Bread Flour (T45)', description: 'High-protein French-style flour, ideal for creating baguettes, croissants, and other viennoiserie with a light, airy texture.', price: 85000, imageUrl: 'https://images.unsplash.com/photo-1581331448968-d03f038d0115?q=80&w=1770', category: 'Flour & Grains' },
  { id: 3, name: 'Madagascar Vanilla Beans (Grade A)', description: 'Plump, oily, and aromatic vanilla beans with a creamy, sweet flavor profile. Essential for high-quality desserts and infusions.', price: 150000, imageUrl: 'https://images.unsplash.com/photo-1628102373815-5952f44357c9?q=80&w=1770', category: 'Spices' },
  { id: 4, name: 'Organic Coconut Sugar', description: 'An unrefined, natural sweetener with a lower glycemic index and a subtle caramel flavor. Excellent for baking and beverages.', price: 60000, imageUrl: 'https://images.unsplash.com/photo-1627918393528-77c8625b8716?q=80&w=1770', category: 'Sweeteners' },
  { id: 5, name: 'Single-Origin Cacao Nibs', description: 'Fermented, dried, and roasted cacao beans. Offers intense, unsweetened chocolate flavor and a crunchy texture for culinary applications.', price: 120000, imageUrl: 'https://images.unsplash.com/photo-1481137092143-8f8d55d28b63?q=80&w=1770', category: 'Chocolate' },
  { id: 6, name: 'Himalayan Pink Salt (Coarse)', description: 'Unrefined, mineral-rich salt harvested from the Khewra Salt Mine. Ideal for finishing dishes, curing, and brining.', price: 45000, imageUrl: 'https://images.unsplash.com/photo-1605943884343-228785a97f4a?q=80&w=1770', category: 'Spices' },
  { id: 7, name: 'Italian "00" Flour', description: 'Finely milled soft wheat flour, the gold standard for authentic Neapolitan pizza and fresh pasta with a silky texture.', price: 95000, imageUrl: 'https://images.unsplash.com/photo-1627485785093-f1f3918a1a39?q=80&w=1770', category: 'Flour & Grains' },
  { id: 8, name: 'Kampot Black Peppercorns', description: 'A globally renowned peppercorn from Cambodia with a complex flavor profile that is both spicy and floral. A must-have for professional kitchens.', price: 180000, imageUrl: 'https://images.unsplash.com/photo-1606852395350-23b9f712b54b?q=80&w=1770', category: 'Spices' },
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