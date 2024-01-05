import ChatModal from '../components/modal/ChatModal';
import ProfileModal from '../components/modal/ProfileModal';
import PurchaseModal from '../components/modal/PurchaseModal';
import SelectedModal from '../components/modal/SelectedModal';
import SaleModal from './../components/modal/SaleModal';

export default function ModalProvider() {
  return (
    <>
      <PurchaseModal />
      <SaleModal />
      <ProfileModal />
      <SelectedModal />
      <ChatModal />
    </>
  );
}
