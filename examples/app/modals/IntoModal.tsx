import { FC } from 'react';
import Modal from 'react-modal';
import { useModalContext, TOpenModalType } from '../../../src';
import { CongratsModal } from './CongratsModal';

interface IIntroModalProps {
  onRequestClose: () => void;
  openModal: TOpenModalType;
}

const IntroModal: FC<IIntroModalProps> = ({ onRequestClose, openModal }) => (
  <Modal onRequestClose={onRequestClose} isOpen={true}>
    <h1>Hi, this is introduction modal</h1>
    <h2>By clicking close you can close this modal or you can try clicking on open congratulation modal to replace this modal with another.</h2>
    <button onClick={onRequestClose}>Close</button>
    <button onClick={() => openModal(CongratsModal, { text: 'you came here from intro Modal' })}>
      Open congratulation modal
    </button>
  </Modal>
)

export const IntroModalOpener: React.FC = () => {
  const { openModal } = useModalContext();

  const handleClick = () => {
    openModal(IntroModal);
  }

  return (
    <button type="button" onClick={handleClick}>
      Open Introduction Modal
    </button>
  );
}