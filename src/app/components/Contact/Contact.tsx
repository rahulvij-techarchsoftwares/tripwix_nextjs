import './styles.css';

import React from 'react';

import { ContactForm } from './ContactForm';
import { ContactFormProps } from './types';

export const Contact: React.FC<ContactFormProps> = () => {
  return (
    <div className="contact">
      <div className="bg-white rounded-2xl p-8 md:w-[650px] m-auto">
        <ContactForm />
      </div>
    </div>
  );
};
