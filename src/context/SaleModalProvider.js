import { createContext, useState } from 'react';

const SaleModalContext = createContext({});

export const SaleModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSaleModal = () => {
    setIsOpen(true);
  };

  const closeSaleModal = () => {
    setIsOpen(false);
  };

  return (
    <SaleModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openSaleModal,
        closeModal: closeSaleModal,
      }}
    >
      {children}
    </SaleModalContext.Provider>
  );
};

export default SaleModalContext;
