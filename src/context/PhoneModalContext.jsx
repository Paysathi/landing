import { createContext, useContext, useState } from 'react';

const PhoneModalContext = createContext(null);

export function PhoneModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <PhoneModalContext.Provider value={{ open, setOpen }}>
      {children}
    </PhoneModalContext.Provider>
  );
}

export function usePhoneModal() {
  const ctx = useContext(PhoneModalContext);
  if (!ctx) {
    throw new Error('usePhoneModal must be used inside <PhoneModalProvider>');
  }
  return ctx;
}
