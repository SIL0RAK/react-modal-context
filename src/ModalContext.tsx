import { useContext, createContext, useState, ComponentType, FC, useCallback, useMemo } from 'react';

export interface IComponent extends Record<string, unknown> {
  onRequestClose: () => void;
  openModal?: TOpenModalType;
  openNextModal?: TOpenModalType;
}

export type ModalComponentType = ComponentType<IComponent>
type ModalComponentPropsType = Record<string, unknown>

export type TOpenModalType = (
  newComponent: ModalComponentType,
  newProps?: ModalComponentPropsType
) => void

interface IModal {
  id: number;
  component: ModalComponentType;
  props: ModalComponentPropsType;
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
    newProps = {},
  ) => {
    setModalsList([
      {
        id: 0,
        component: newComponent,
        props: newProps,
      },
    ]);
  }, []);

  /**
   * Opens new modal and pushes currently open modal to queue.
   */
  const openNextModal: TOpenModalType = useCallback((
    newComponent,
    newProps = {},
  ) => {
    setModalsList([
      ...modalsList,
      {
        id: modalsList.length,
        component: newComponent,
        props: newProps,
      },
    ]);
  }, []);

  /**
   * Closes currently open modal
   */
  const closeModal = useCallback(() => {
    setModalsList(currentState => (
      currentState.filter(modal => modal.id !== currentState.length - 1)
    ));
  }, []);

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
          {...props}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalContext;
