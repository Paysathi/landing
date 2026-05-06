import { createContext, useCallback, useContext, useState } from 'react';

const PhoneModalContext = createContext(null);

const DEFAULT_OPTIONS = Object.freeze({
  title: 'Book a Demo',
  subtitle: "Enter your phone number and we'll set up a personalized walkthrough.",
  submitLabel: 'Continue to Book',
});

export function PhoneModalProvider({ children }) {
  const [open, setOpenState] = useState(false);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const setOpen = useCallback((next) => {
    if (!next) setOptions(DEFAULT_OPTIONS);
    setOpenState(Boolean(next));
  }, []);

  const openWith = useCallback((customOptions = {}) => {
    setOptions({ ...DEFAULT_OPTIONS, ...customOptions });
    setOpenState(true);
  }, []);

  return (
    <PhoneModalContext.Provider value={{ open, setOpen, openWith, options }}>
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
