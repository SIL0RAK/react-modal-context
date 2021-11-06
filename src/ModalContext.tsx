import { useContext, createContext, useState, ComponentType, FC, useCallback } from 'react';

export interface IComponent extends Record<string, unknown> {
  close: () => void;
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
  clearModals: () => void;
}

export const ModalContext = createContext<IModalContext>({
  openModal: () => {},
  openNextModal: () => {},
  closeModal: () => {},
  clearModals: () => {},
});

export const ModalContextProvider: FC = ({ children }) => {
  const [modalsList, setModalsList] = useState<Array<IModal>>([]);

  const clearModals = useCallback((): void => setModalsList([]), []);

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

  const closeModal = useCallback(() => {
    setModalsList(currentState => (
      currentState.filter(modal => modal.id !== currentState.length - 1)
    ));
  }, [setModalsList]);

  const {
    component: Component,
    props,
  } = modalsList[modalsList.length - 1] || {};

  const value = {
    openModal,
    openNextModal,
    closeModal,
    clearModals,
  };

  return (
    <ModalContext.Provider value={value}>
      {Component && (
        <Component
          openNextModal={openNextModal}
          openModal={openModal}
          close={closeModal}
          {...props}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalContext;
