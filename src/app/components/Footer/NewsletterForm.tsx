import React, { useState } from 'react';

import { subscribeNewsletter } from '~/actions/subscribe-newsletter-form';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await subscribeNewsletter({ email });
      if (response.ok) {
        setMessage('Subscription successful!');
        setEmail('');
      } else {
        setMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <p className="text-white text-center md:text-left md:pb-20">
        Exclusive insights and offers await. Subscribe now.
      </p>
      <form onSubmit={handleSubmit} className="flex space-x-4 mb-1">
        <input
          type="email"
          placeholder="Your Email Here*"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-transparent text-white flex-grow w-full !py-4 !px-6 border border-white-50 rounded-2xl placeholder-white-50"
        />
        <button
          type="submit"
          className="bg-success text-white rounded-2xl !py-4 !px-6 flex-grow md:w-1/3"
        >
          <div className="hidden lg:block">Sign Me Up</div>
          <div className="lg:hidden">Send</div>
        </button>
      </form>
      {message && <p className="text-white ml-1 pt-1">{message}</p>}
    </>
  );
};
