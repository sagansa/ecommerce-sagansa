// FIX: Implemented the missing UserProfilePage component to allow logged-in users to view and edit their profile information.
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface UserProfilePageProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || ''); // Email is usually not editable
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="py-16 bg-stone-50 min-h-[60vh]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-stone-800">My Profile</h1>
          <p className="mt-4 text-lg text-stone-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      setMessage('Name cannot be empty.');
      return;
    }
    onUpdateUser({ ...user, name });
    setMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="py-16 bg-stone-50 min-h-[60vh]">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Your Profile</h1>
          <p className="mt-4 text-lg text-stone-600">Manage your account details here.</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-stone-200">
          <form onSubmit={handleSave}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700"
                  />
                ) : (
                  <p className="mt-1 text-lg text-stone-800">{name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email Address</label>
                <p className="mt-1 text-lg text-stone-800">{email}</p>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              {isEditing ? (
                <div className="flex gap-4">
                  <button type="submit" className="px-6 py-2 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-colors">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => { setIsEditing(false); setName(user.name); }} className="px-6 py-2 bg-stone-200 text-stone-800 font-bold rounded-lg hover:bg-stone-300 transition-colors">
                    Cancel
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setIsEditing(true)} className="px-6 py-2 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-colors">
                  Edit Profile
                </button>
              )}
            </div>
            {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
