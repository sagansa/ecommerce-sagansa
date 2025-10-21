// FIX: Implemented missing OrderHistoryPage component.
import React from 'react';
import { Order, User } from '../types';

interface OrderHistoryPageProps {
  orders: Order[];
  user: User | null;
}

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ orders, user }) => {
  if (!user) {
    return (
      <div className="py-16 bg-stone-50 min-h-[60vh]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-stone-800">Order History</h1>
          <p className="mt-4 text-lg text-stone-600">Please log in to view your past orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-stone-50 min-h-[60vh]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Your Order History</h1>
          <p className="mt-4 text-lg text-stone-600">Here are your past supply orders with us, {user.name}.</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-stone-800">No Orders Yet</h2>
            <p className="text-stone-600 mt-2">You haven't placed any orders with us. Time to explore the catalog!</p>
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border border-stone-200">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-4 border-b border-stone-200">
                  <div>
                    <h2 className="text-xl font-bold text-stone-800">Order #{order.id}</h2>
                    <p className="text-sm text-stone-500">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-stone-700">{item.name}</p>
                        <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-stone-700">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-center mt-4 pt-4 border-t border-stone-200">
                  <span className="text-lg font-bold text-stone-800">Total: Rp {order.total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;