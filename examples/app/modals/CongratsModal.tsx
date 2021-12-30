import { FC } from 'react';
import Modal from 'react-modal';
import { useModalContext } from '../../../src';

interface ICongratsModalProps {
  onRequestClose: () => void;
  text: string;
}

export const CongratsModal: FC<ICongratsModalProps> = ({ onRequestClose, text }) => (
  <Modal onRequestClose={onRequestClose} isOpen={true}>
    <h1>Hi, this is Congratulation modal</h1>
    { text && <p>{text}</p> }

    <button onClick={onRequestClose}>
      Close
    </button>
  </Modal>
)

export const CongratsModalOpener: React.FC = () => {
  const { openModal } = useModalContext();

  const handleClick = () => {
    openModal(CongratsModal, { text: 'you came here from Main window' });
  }

  return (
    <button type="button" onClick={handleClick}>
      Open Congratulation Modal
    </button>
  );
}