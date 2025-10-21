
import React from 'react';

const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-amber-500">Golden Harvest Supply</h3>
            <p className="mt-4 text-stone-400">
              Providing premium raw ingredients for professional kitchens and passionate home cooks. We are dedicated to quality, sustainability, and the art of cooking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white tracking-wider">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-500 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-amber-500 transition-colors">Shop</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-500 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-500 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white tracking-wider">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-stone-400">
              <li>123 Culinary Lane, ID</li>
              <li>support@goldenharvest.com</li>
              <li>+62 123 4567 8900</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-stone-500">&copy; {new Date().getFullYear()} Golden Harvest Supply. All Rights Reserved.</p>
          {/* Social Icons would go here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
