import { FC } from 'react';
import Modal from 'react-modal';
import { useModalContext, TOpenModalType } from '../../../src';

interface IIntroModalProps {
  onRequestClose: () => void;
  openNextModal: TOpenModalType;
  onRequestCloseAll?: () => void;
}

const ThirdModal: FC<IIntroModalProps> = ({ onRequestClose, onRequestCloseAll }) => (
  <Modal onRequestClose={onRequestClose} isOpen={true}>
   <h1>Hi, this is Third</h1>
    <button onClick={onRequestCloseAll}>Close all modals</button>
    <button onClick={onRequestClose}>Go back</button>
  </Modal>
)

const SecondModal: FC<IIntroModalProps> = ({ onRequestClose, openNextModal, onRequestCloseAll }) => (
  <Modal onRequestClose={onRequestClose} isOpen={true}>
    <h1>Hi, this is Second</h1>
    <button onClick={onRequestCloseAll}>Close all modals</button>
    <button onClick={onRequestClose}>Go back</button>
    <button onClick={() => openNextModal(ThirdModal)}>
      Open Third modal
    </button>
  </Modal>
)

const FirstModal: FC<IIntroModalProps> = ({ onRequestClose, openNextModal, }) => (
  <Modal onRequestClose={onRequestClose} isOpen={true}>
    <h1>Hi, this is First</h1>
    <button onClick={onRequestClose}>Close</button>
    <button onClick={() => openNextModal(SecondModal)}>
      Open second modal
    </button>
  </Modal>
)

export const CarouselModalOpener = () => {
  const { openModal } = useModalContext();

  const handleClick = () => {
    openModal(FirstModal);
  }

  return (
    <button type="button" onClick={handleClick}>
      Open carousel
    </button>
  );
}