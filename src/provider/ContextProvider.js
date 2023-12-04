import { AuthProvider } from '../context/AuthProvider';
import { ProfileModalProvider } from '../context/ProfileModalProvider';
import { PurchaseModalProvider } from '../context/PurchaseModalProvider';
import { SaleModalProvider } from '../context/SaleModalProvider';

export default function ContextProvider({ children }) {
  return (
    <>
      <AuthProvider>
        <PurchaseModalProvider>
          <SaleModalProvider>
            <ProfileModalProvider>{children}</ProfileModalProvider>
          </SaleModalProvider>
        </PurchaseModalProvider>
      </AuthProvider>
    </>
  );
}
