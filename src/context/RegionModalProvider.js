import { createContext, useState } from 'react';

const RegionModalContext = createContext({});

export const RegionModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openRegionModal = () => {
    setIsOpen(true);
  };

  const closeRegionModal = () => {
    setIsOpen(false);
  };

  return (
    <RegionModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openRegionModal,
        closeModal: closeRegionModal,
      }}
    >
      {children}
    </RegionModalContext.Provider>
  );
};

export default RegionModalContext;
