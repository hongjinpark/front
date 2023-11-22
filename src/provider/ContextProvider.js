import { AuthProvider } from '../context/AuthProvider';
import { PurchaseModalProvider } from '../context/PurchaseModalProvider';
import { SaleModalProvider } from '../context/SaleModalProvider';

export default function ContextProvider({ children }) {
  return (
    <>
      <AuthProvider>
        <PurchaseModalProvider>
          <SaleModalProvider>{children}</SaleModalProvider>
        </PurchaseModalProvider>
      </AuthProvider>
    </>
  );
}
