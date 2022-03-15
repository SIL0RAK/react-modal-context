import { fireEvent, render, screen } from '@testing-library/react';
import { FC } from 'react';
import { useModalContext, ModalContextProvider, TOpenModalType } from '../src';

const wrapper = ({ children }: { children: any }) => <ModalContextProvider>{children}</ModalContextProvider>;

describe('react-modal-ctx', () => {
  describe('openModal', () => {
    it('should open provided modal', () => {
      const Component = () => {
        const { openModal } = useModalContext();
        
        return (
          <button type="button" onClick={() => openModal(() => <div>Hello</div>)}>
            Open modal
          </button>
        );
      }
  
      render(<Component/>, { wrapper })
  
      expect(screen.queryByText('Hello')).toBeNull();
  
      fireEvent.click(screen.getByText('Open modal'));
  
      expect(screen.queryByText('Hello')).not.toBeNull();
    });

    it('should replace previously opened modal', () => {
      const Component = () => {
        const { openModal, closeModal } = useModalContext();
        
        return (
          <>
            <button type="button" onClick={() => openModal(() => <div>Hello</div>)}>
              Open modal
            </button>
            <button type="button" onClick={() => openModal(() => <div>World</div>)}>
              Open next modal
            </button>
            <button type="button" onClick={closeModal}>
              Close currently open modal
            </button>
          </>
        );
      }
  
      render(<Component/>, { wrapper })
  
      expect(screen.queryByText('Hello')).toBeNull();
      expect(screen.queryByText('World')).toBeNull();
  
      fireEvent.click(screen.getByText('Open modal'));
  
      expect(screen.queryByText('Hello')).not.toBeNull();
      expect(screen.queryByText('World')).toBeNull();
  
      fireEvent.click(screen.getByText('Open next modal'));
  
      expect(screen.queryByText('Hello')).toBeNull();
      expect(screen.queryByText('World')).not.toBeNull();

      fireEvent.click(screen.getByText('Close currently open modal'));
      
      expect(screen.queryByText('Hello')).toBeNull();
      expect(screen.queryByText('World')).toBeNull();
    });
  })

  describe('openNextModal', () => {
    it('should open another modal on top of currently opened', () => {
      const Component = () => {
        const { openModal, openNextModal } = useModalContext();
        
        return (
          <>
            <button type="button" onClick={() => openModal(() => <div>Hello</div>)}>
              Open modal
            </button>
            <button type="button" onClick={() => openNextModal(() => <div>World</div>)}>
              Open next modal
            </button>
          </>
        );
      }
  
      render(<Component/>, { wrapper })
  
      expect(screen.queryByText('Hello')).toBeNull();
      expect(screen.queryByText('World')).toBeNull();
  
      fireEvent.click(screen.getByText('Open modal'));
  
      expect(screen.queryByText('Hello')).not.toBeNull();
      expect(screen.queryByText('World')).toBeNull();
  
      fireEvent.click(screen.getByText('Open next modal'));
  
      expect(screen.queryByText('Hello')).toBeNull();
      expect(screen.queryByText('World')).not.toBeNull();
    });

    it('should display previous modal if current modal was added to stack', () => {
      const Component = () => {
        const { openModal, closeModal, openNextModal } = useModalContext();
        
        return (
          <>
            <button type="button" onClick={() => openModal(() => <div>Hello</div>)}>
              Open modal
            </button>
            <button type="button" onClick={() => openNextModal(() => <div>World</div>)}>
              Open next modal
            </button>
            <button type="button" onClick={closeModal}>
              Close currently open modal
            </button>
          </>
        );
      }
  
      render(<Component/>, { wrapper })
  
      fireEvent.click(screen.getByText('Open modal'));
      fireEvent.click(screen.getByText('Open next modal'));
  
      expect(screen.queryByText('Hello')).toBeNull();
      expect(screen.queryByText('World')).not.toBeNull();
  
      fireEvent.click(screen.getByText('Close currently open modal'));
  
      expect(screen.queryByText('Hello')).not.toBeNull();
      expect(screen.queryByText('World')).toBeNull();
    });
  })

  describe('closeAllModals', () => {
    it('should close all modals on close all modals call', () => {
      const Component = () => {
        const { openModal, closeModal, openNextModal, closeAllModals } = useModalContext();
        
        return (
          <>
            <button type="button" onClick={() => openModal(() => <div>Hello</div>)}>
              Open modal
            </button>
            <button type="button" onClick={() => openNextModal(() => <div>World</div>)}>
              Open next modal
            </button>
            <button type="button" onClick={closeAllModals}>
              Close all modals
            </button>
          </>
        );
      }
  
      render(<Component/>, { wrapper })
  
      fireEvent.click(screen.getByText('Open modal'));
      fireEvent.click(screen.getByText('Open next modal'));
  
      expect(screen.queryByText('Hello')).toBeNull();
      expect(screen.queryByText('World')).not.toBeNull();
  
      fireEvent.click(screen.getByText('Close all modals'));
  
      expect(screen.queryByText('Hello')).toBeNull();
      expect(screen.queryByText('World')).toBeNull();
    });
  })

  describe('modal actions', () => {
    describe('onRequestCloseAll', () => {
      it('should close all modals', () => {
        const NextModal: FC<{ onRequestCloseAll?: () => void; }> = ({ onRequestCloseAll }) => (
          <div>
            World
            <button type="button" onClick={onRequestCloseAll}>
                Close all modals
            </button>
          </div>
        );
        
        const Component = () => {
          const { openModal, openNextModal } = useModalContext();
    
          return (
            <>
              <button type="button" onClick={() => openModal(() => <div>Hello</div>)}>
                Open modal
              </button>
              <button type="button" onClick={() => openNextModal(NextModal)}>
                Open next modal
              </button>
            </>
          );
        }
    
        render(<Component/>, { wrapper })
    
        fireEvent.click(screen.getByText('Open modal'));
        fireEvent.click(screen.getByText('Open next modal'));
    
        expect(screen.queryByText('Hello')).toBeNull();
        expect(screen.queryByText('World')).not.toBeNull();
    
        fireEvent.click(screen.getByText('Close all modals'));
    
        expect(screen.queryByText('Hello')).toBeNull();
        expect(screen.queryByText('World')).toBeNull();
      });
    });

    describe('onRequestClose', () => {
      it('should close currently opened modal', () => {
        const NextModal: FC<{ onRequestClose: () => void; }> = ({ onRequestClose }) => (
          <div>
            World
            <button type="button" onClick={onRequestClose}>
                Close current modal
            </button>
          </div>
        );
        
        const Component = () => {
          const { openModal, openNextModal } = useModalContext();
    
          return (
            <>
              <button type="button" onClick={() => openModal(() => <div>Hello</div>)}>
                Open modal
              </button>
              <button type="button" onClick={() => openNextModal(NextModal)}>
                Open next modal
              </button>
            </>
          );
        }
    
        render(<Component/>, { wrapper })
    
        fireEvent.click(screen.getByText('Open modal'));
        fireEvent.click(screen.getByText('Open next modal'));
    
        expect(screen.queryByText('Hello')).toBeNull();
        expect(screen.queryByText('World')).not.toBeNull();
    
        fireEvent.click(screen.getByText('Close current modal'));
    
        expect(screen.queryByText('Hello')).not.toBeNull();
        expect(screen.queryByText('World')).toBeNull();
      });
    });

    describe('openNextModal', () => {
      it('should open next modal using current modal', () => {
        const NextModal = () => <div>World</div>;

        const Modal: FC<{ openNextModal?: TOpenModalType; }> = ({ openNextModal }) => (
          <div>
            World
            <button type="button" onClick={() => openNextModal(NextModal)}>
                Open next modal
            </button>
          </div>
        );
        
        const Component = () => {
          const { openModal } = useModalContext();
    
          return (
            <>
              <button type="button" onClick={() => openModal(Modal)}>
                Open modal
              </button>openNextModal: TOpenModalType;
            </>
          );
        }
    
        render(<Component/>, { wrapper })
    
        fireEvent.click(screen.getByText('Open modal'));

        expect(screen.queryByText('Hello')).toBeNull();
        expect(screen.queryByText('World')).not.toBeNull();

        fireEvent.click(screen.getByText('Open next modal'));
    
        expect(screen.queryByText('Hello')).toBeNull();
        expect(screen.queryByText('World')).not.toBeNull();
      });
    });
  });
});
