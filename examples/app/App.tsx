import { ModalContextProvider } from '../../src';
import { IntroModalOpener } from './modals/IntoModal';
import { CongratsModalOpener } from './modals/CongratsModal';
import { CarouselModalOpener } from './modals/Carusel';

const App = () => (
  <ModalContextProvider>
    <div>
      <h1>Hello World</h1>
      <IntroModalOpener />
      <CongratsModalOpener />

      <div>
        <CarouselModalOpener />
      </div>
    </div>
  </ModalContextProvider>
);

export default App;
