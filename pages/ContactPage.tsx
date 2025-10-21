
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    // Mock form submission
    setTimeout(() => {
      setStatus('Your message has been sent successfully! We will get back to you shortly.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setStatus(''), 5000);
    }, 1000);
  };

  return (
    <div className="bg-stone-50">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Get in Touch</h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Have a question about our products, an order, or a partnership? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-stone-800 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700">Full Name</label>
                  <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email Address</label>
                  <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700">Subject</label>
                <input type="text" id="subject" required value={subject} onChange={e => setSubject(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
                <textarea id="message" rows={5} required value={message} onChange={e => setMessage(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-700 focus:ring-amber-700"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full py-3 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-300">
                  Submit Inquiry
                </button>
              </div>
              {status && <p className="text-center text-green-600 mt-4">{status}</p>}
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-stone-800 mb-6">Contact Information</h2>
            <div className="space-y-4 text-stone-700">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>123 Culinary Lane, Foodie City, ID 45678</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+62 123 4567 8900</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>support@goldenharvest.com</p>
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday: 10am - 3pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
