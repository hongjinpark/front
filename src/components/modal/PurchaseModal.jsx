import PurchaseModalContext from '../../context/PurchaseModalProvider';
import Modal from './Modal';
export default function PurchaseModal() {
  return <Modal ModalContext={PurchaseModalContext} title={'구매 내역'} />;
}
