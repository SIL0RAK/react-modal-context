# React modal context

Modal control context made to be used with `react-modal` library.
This context grans you more control over modals for example:

* Close modal on message or event.
* Open modal instead of currently open modal.
* Switch between modals.
* Use modals as carousel.

## Table of Contents

* [Installation](##Installation)
* [Documentation](##Documentation)

## Installation

you can use npm or yarn

```bash
$ npm install react-modal-ctx
```

```bash
$ yarn add react-modal-ctx
```

## Documentation

### ModalContextProvider

```tsx
import { ModalContextProvider } from 'react-modal-ctx';

const App = () => (
  <ModalContextProvider>
    <Page />
  </ModalContextProvider>
)
```

wrapping `Page` component enables you to use `useModalContext` in it.

### useModalContext

```typescript
import { useModalContext } from 'react-modal-ctx';

const {
  openModal,
  openNextModal, 
  closeModal,
  clearModals,
} = useModalContext();
```

| Method          | Description                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| `openModal`     | Closes(clears) all other modals and open's new modal.                                                          |
| `openNextModal` | opens new modal but leaves old modals in queue so when this modal will be closed previous modal will be shown. |
| `closeModal`    | closes top modal                                                                                               |
| `closeAllModals`| closes all modals in queue                                                                                     |

