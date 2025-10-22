import React from 'react';
import { Product, User } from '../types';
import { ShoppingBagIcon, HeartIcon } from './icons';

interface ProductCardProps {
  product: Product;
  user: User | null;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  user,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  isInWishlist,
}) => {
  const fallbackImage = React.useMemo(() => {
    const truncatedName = product.name ? product.name.slice(0, 24) : 'Product';
    const safeText = truncatedName
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='420'><rect width='600' height='420' fill='#f5f5f4'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#78716c' font-family='Helvetica, Arial, sans-serif' font-size='24' font-weight='600'>${safeText}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }, [product.name]);

  const imageSource = product.imageUrl ?? fallbackImage;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img 
          src={imageSource} 
          alt={product.name}
          className="w-full h-56 object-cover cursor-pointer"
          onClick={() => onViewDetails(product)}
        />
        {user && (
          <div className="absolute top-2 right-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }} 
              className={`p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md transition-colors ${isInWishlist ? 'text-red-500' : 'text-stone-500 hover:text-red-500'}`}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <HeartIcon className={`w-6 h-6 ${isInWishlist ? 'fill-current' : 'fill-none'}`} />
            </button>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-stone-500">{product.category}</p>
        <h3 
          className="text-lg font-semibold text-stone-800 mt-1 truncate cursor-pointer hover:text-amber-800"
          onClick={() => onViewDetails(product)}
          title={product.name}
        >
          {product.name}
        </h3>
        <div className="mt-4 flex-grow"></div> {/* Spacer */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-bold text-stone-900">Rp {product.price.toLocaleString('id-ID')}</p>
          <button 
            onClick={() => onAddToCart(product, 1)} 
            className="p-2 bg-amber-800 text-white rounded-full shadow-md hover:bg-amber-900 transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBagIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
