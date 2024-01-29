import { AuthProvider } from '../context/AuthProvider';
import { AxiosProvider } from '../context/AxiosProvider';
import { ProfileModalProvider } from '../context/ProfileModalProvider';
import { PurchaseModalProvider } from '../context/PurchaseModalProvider';
import { SaleModalProvider } from '../context/SaleModalProvider';
import { SelectedModalProvider } from '../context/SelectedModalProvider';
import { ChatModalProvider } from './../context/ChatModalProvider';
import { AttentionModalProvider } from '../context/AttentionModalProvider';
import { RegionModalProvider } from '../context/RegionModalProvider';
import { DeleteModalProvider } from '../context/DeleteModalProvider';

export default function ContextProvider({ children }) {
  return (
    <>
      <AuthProvider>
        <AxiosProvider>
          <ChatModalProvider>
            <PurchaseModalProvider>
              <SaleModalProvider>
                <ProfileModalProvider>
                  <SelectedModalProvider>
                    <AttentionModalProvider>
                      <RegionModalProvider>
                        <DeleteModalProvider>{children}</DeleteModalProvider>
                      </RegionModalProvider>
                    </AttentionModalProvider>
                  </SelectedModalProvider>
                </ProfileModalProvider>
              </SaleModalProvider>
            </PurchaseModalProvider>
          </ChatModalProvider>
        </AxiosProvider>
      </AuthProvider>
    </>
  );
}
