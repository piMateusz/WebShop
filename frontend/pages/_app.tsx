import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '../styles/globals.css'
import { store, persistor } from '../components/store/configureStore';
import Nav from '../components/layout/nav';
import Footer from '../components/layout/footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="h-screen">
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}
