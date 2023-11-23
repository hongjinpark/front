import { createContext, useState } from 'react';

const PurchaseModalContext = createContext({});

export const PurchaseModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPurchaseModal = () => {
    setIsOpen(true);
  };

  const closePurchaseModal = () => {
    setIsOpen(false);
  };

  return (
    <PurchaseModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openPurchaseModal,
        closeModal: closePurchaseModal,
      }}
    >
      {children}
    </PurchaseModalContext.Provider>
  );
};

export default PurchaseModalContext;
