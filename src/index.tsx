import { useContext, createContext, useState, ComponentType, FC, useCallback, useMemo } from 'react';

export interface IModalProps {
  onRequestClose: () => void;
  openModal?: TOpenModalType;
  openNextModal?: TOpenModalType;
  onRequestCloseAll?: () => void;
}

export type TOpenModalType = <T extends IModalProps>(
  newComponent: ComponentType<T>,
  newProps?: Omit<T, 'onRequestClose'>,
) => void;

interface IModal {
  id: number;
  component: ComponentType<IModalProps>;
  props?: Record<string, unknown>;
}

interface IModalContext {
  openModal: TOpenModalType;
  openNextModal: TOpenModalType;
  closeModal: () => void;
  closeAllModals: () => void;
}

export const ModalContext = createContext<IModalContext>({
  openModal: () => {},
  openNextModal: () => {},
  closeModal: () => {},
  closeAllModals: () => {},
});


export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider: FC = ({ children }) => {
  const [modalsList, setModalsList] = useState<Array<IModal>>([]);

  /**
   * clears all modals
   */
  const closeAllModals = useCallback((): void => setModalsList([]), []);

  /**
   * Opens modal and clears all other modals
   */
  const openModal: TOpenModalType = useCallback((
    newComponent,
    newProps,
  ) => {
    setModalsList([
      {
        id: 0,
        component: newComponent as ComponentType<IModalProps>,
        props: newProps,
      },
    ]);
  }, []);

  /**
   * Opens new modal and pushes currently open modal to queue.
   */
  const openNextModal: TOpenModalType = useCallback((
    newComponent,
    newProps,
  ) => {
    setModalsList((list) => [
      ...list,
      {
        id: list.length,
        component: newComponent as ComponentType<IModalProps>,
        props: newProps,
      },
    ]);
  }, []);

  /**
   * Closes currently open modal
   */
  const closeModal = useCallback(() => {
    setModalsList(currentState => {
      console.log(currentState);
      return currentState.filter(modal => modal.id !== currentState.length - 1)
    });
  }, []);

  console.log(modalsList);

  const value = useMemo<IModalContext>(() => ({
    openModal,
    openNextModal,
    closeModal,
    closeAllModals,
  }), []);

  const { component: Component, props } = modalsList[modalsList.length - 1] || {};

  return (
    <ModalContext.Provider value={value}>
      {Component && (
        <Component
          openNextModal={openNextModal}
          openModal={openModal}
          onRequestClose={closeModal}
          onRequestCloseAll={closeAllModals}
          {...props}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
