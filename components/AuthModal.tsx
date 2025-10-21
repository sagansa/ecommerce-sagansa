import React, { useState } from 'react';
import { User } from '../types';
import { XMarkIcon } from './icons';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onLogin, onRegister, onSwitchMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password || (mode === 'register' && !name)) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Mock authentication logic
    const user: User = { name, email };

    if (mode === 'login') {
      // In a real app, you'd validate against a backend
      console.log('Logging in user:', user);
      onLogin(user);
    } else {
      console.log('Registering user:', user);
      onRegister(user);
    }
  };
  
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      aria-labelledby="auth-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-amber-800 transition-colors z-10"
          aria-label="Close"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>
        <div className="p-8 md:p-12">
          <h2 id="auth-modal-title" className="text-3xl font-bold text-stone-800 text-center">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-stone-600 text-center mt-2">
            {mode === 'login' ? 'Sign in to continue.' : 'Get started with your free account.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-300"
              >
                {mode === 'login' ? 'Login' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                className="font-semibold text-amber-700 hover:text-amber-800 ml-1"
              >
                {mode === 'login' ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
