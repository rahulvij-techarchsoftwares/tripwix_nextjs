'use client';
import React, { createContext, useContext, useState } from 'react';

enum Tabs {
  InstantBooking = 'instantBooking',
  Inquiry = 'inquiry',
}

const BookingFrameContext = createContext({
  isExpanded: false,
  triggerExpand: (state?: boolean) => {},
});

export interface BookingFrameProviderProps {
  instantBookFormComponent?: React.ReactNode;
  inquiryFormComponent: React.ReactNode;
}

export const BookingFrameProvider: React.FC<BookingFrameProviderProps> = ({
  instantBookFormComponent,
  inquiryFormComponent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.InstantBooking);

  const triggerExpand = (state?: boolean) => {
    setIsExpanded(state! ? state : !isExpanded);
  };

  const hasBothComponents = instantBookFormComponent && inquiryFormComponent;

  return (
    <BookingFrameContext.Provider value={{ isExpanded, triggerExpand }}>
      {hasBothComponents ? (
        <>
          <div className="flex mx-4 lg:mb-4 rounded-t-xl lg:rounded-xl bg-gray-200 relative overflow-hidden border-b-2 border-gray-200 lg:border-b-0">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-primary transition-all duration-300 rounded-t-xl lg:rounded-xl ${activeTab === Tabs.InstantBooking ? 'translate-x-0' : 'translate-x-full'}`}
            />
            <button
              className={`relative z-10 flex-1 p-3 rounded-t-xl lg:rounded-xl transition-all duration-300 ${activeTab === Tabs.InstantBooking ? 'text-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(Tabs.InstantBooking)}
            >
              Instant Booking
            </button>
            <button
              className={`relative z-10 flex-1 p-3 rounded-t-xl lg:rounded-xl transition-all duration-300 ${activeTab === Tabs.Inquiry ? 'text-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(Tabs.Inquiry)}
            >
              Inquiry
            </button>
          </div>
          {activeTab === Tabs.InstantBooking && instantBookFormComponent}
          {activeTab === Tabs.Inquiry && inquiryFormComponent}
        </>
      ) : (
        inquiryFormComponent
      )}
    </BookingFrameContext.Provider>
  );
};

export const useBookingFrame = () => useContext(BookingFrameContext);
