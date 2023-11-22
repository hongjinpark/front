import { createContext, useState } from 'react';

const PurchaseModalContext = createContext({});

export const PurchaseModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPurchseModal = () => {
    setIsOpen(true);
  };

  const closePurchseModal = () => {
    setIsOpen(false);
  };

  return (
    <PurchaseModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openPurchseModal,
        closeModal: closePurchseModal,
      }}
    >
      {children}
    </PurchaseModalContext.Provider>
  );
};

export default PurchaseModalContext;
