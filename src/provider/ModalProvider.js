import ProfileModal from '../components/modal/ProfileModal';
import PurchaseModal from '../components/modal/PurchaseModal';
import SaleModal from './../components/modal/SaleModal';

export default function ModalProvider() {
  return (
    <>
      <PurchaseModal />
      <SaleModal />
      <ProfileModal />
    </>
  );
}
