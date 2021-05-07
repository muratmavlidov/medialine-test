import React from 'react';
import { useStore } from "react-redux";
import { wrapper } from '../store';
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import '../styles/style.scss';

const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
        {children}
      </div>
    </>
  )
}


function MyApp({ Component, pageProps } ) {
  const store = useStore((state) => state)

  return (
    <Layout>
      <ChakraProvider>
        <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </PersistGate>
      </ChakraProvider>
    </Layout>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
};

export default wrapper.withRedux(MyApp);