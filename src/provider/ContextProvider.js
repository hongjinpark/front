import { AuthProvider } from '../context/AuthProvider';
import { ProfileModalProvider } from '../context/ProfileModalProvider';
import { PurchaseModalProvider } from '../context/PurchaseModalProvider';
import { SaleModalProvider } from '../context/SaleModalProvider';
import { SelectedModalProvider } from '../context/SelectedModalProvider';

export default function ContextProvider({ children }) {
  return (
    <>
      <AuthProvider>
        <PurchaseModalProvider>
          <SaleModalProvider>
            <ProfileModalProvider>
              <SelectedModalProvider>{children}</SelectedModalProvider>
            </ProfileModalProvider>
          </SaleModalProvider>
        </PurchaseModalProvider>
      </AuthProvider>
    </>
  );
}
