
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import UserProfilePage from './pages/UserProfilePage';
import WishlistPage from './pages/WishlistPage';
import ShoppingCart from './components/ShoppingCart';
import ProductDetailModal from './components/ProductDetailModal';
import AuthModal from './components/AuthModal';
import { Product, CartItem, User } from './types';
import { MOCK_ORDERS } from './constants';
import { fetchProducts } from './services/api';

type Page = 'home' | 'shop' | 'checkout' | 'about' | 'contact' | 'orders' | 'profile' | 'wishlist';
type AuthMode = 'login' | 'register';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  const loadProducts = useCallback(async (signal?: AbortSignal) => {
    setProductsError(null);
    setProductsLoading(true);

    try {
      const data = await fetchProducts({ signal });
      setProducts(data);
    } catch (error) {
      const isAbortError =
        error instanceof DOMException && error.name === 'AbortError';

      if (isAbortError) {
        return;
      }

      const message =
        error instanceof Error ? error.message : 'Failed to load products.';
      setProductsError(message);
    } finally {
      setProductsLoading(false);
    }
  }, []);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const handleRetryLoadProducts = useCallback(() => {
    void loadProducts();
  }, [loadProducts]);
  
  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(
            parsedCart.map((item: CartItem) => ({
              ...item,
              id: String(item.id),
            }))
          );
        }
      }

      const savedWishlist = localStorage.getItem('wishlistItems');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        if (Array.isArray(parsedWishlist)) {
          setWishlistItems(
            parsedWishlist.map((item: Product) => ({
              ...item,
              id: String(item.id),
            }))
          );
        }
      }
    } catch (error) {
      console.error('Failed to parse from localStorage', error);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void loadProducts(controller.signal);

    return () => controller.abort();
  }, [loadProducts]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    setWishlistItems(prevItems => {
      const isInWishlist = prevItems.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevItems.filter(item => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setIsAuthModalOpen(false);
  };
  
  const handleRegister = (registeredUser: User) => {
    // In a real app, this would be a login after registration
    setUser(registeredUser);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setWishlistItems([]); // Clear wishlist on logout
    handleNavigate('home');
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={products}
            user={user}
            onNavigateToShop={() => handleNavigate('shop')}
            onAddToCart={handleAddToCart}
            onViewDetails={setSelectedProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            productsLoading={productsLoading}
            productsError={productsError}
            onReloadProducts={handleRetryLoadProducts}
          />
        );
      case 'shop':
        return (
          <ShopPage
            products={products}
            user={user}
            onAddToCart={handleAddToCart}
            onViewDetails={setSelectedProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            isLoading={productsLoading}
            error={productsError}
            onRetry={handleRetryLoadProducts}
          />
        );
      case 'checkout':
        return <CheckoutPage cartItems={cartItems} />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactPage />;
      case 'orders':
        return <OrderHistoryPage orders={MOCK_ORDERS} user={user} />;
      case 'profile':
        return <UserProfilePage user={user} onUpdateUser={handleUpdateUser} />;
      case 'wishlist':
        return (
          <WishlistPage
            wishlistItems={wishlistItems}
            onAddToCart={handleAddToCart}
            onViewDetails={setSelectedProduct}
            onToggleWishlist={handleToggleWishlist}
            onNavigateToShop={() => handleNavigate('shop')}
            user={user}
          />
        );
      default:
        return (
          <HomePage
            products={products}
            user={user}
            onNavigateToShop={() => handleNavigate('shop')}
            onAddToCart={handleAddToCart}
            onViewDetails={setSelectedProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            productsLoading={productsLoading}
            productsError={productsError}
            onReloadProducts={handleRetryLoadProducts}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-stone-800">
      <Header 
        onNavigate={handleNavigate}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={openAuthModal}
        onLogout={handleLogout}
        cartItemCount={cartItemCount}
        user={user}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onNavigateToShop={() => { setIsCartOpen(false); handleNavigate('shop'); }}
        onProceedToCheckout={() => { setIsCartOpen(false); handleNavigate('checkout'); }}
      />
      
      <ProductDetailModal
        product={selectedProduct}
        user={user}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedProduct ? wishlistItems.some(item => item.id === selectedProduct.id) : false}
      />

      {isAuthModalOpen && (
        <AuthModal 
          mode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
};

export default App;
