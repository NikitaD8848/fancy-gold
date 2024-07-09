import type { AppProps } from 'next/app';
import App from 'next/app';
import { Dispatch } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-bootstrap';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoute from '../routes/ProtectedRoute';
import { setDefaultCurrencyValue } from '../store/slices/general_slices/multi-currency-slice';
import { setMultiLingualData } from '../store/slices/general_slices/multilang-slice';
import { persistor, store } from '../store/store';
import { CONSTANTS } from '../services/config/app-config';
import { getMultiCurrencyValue } from '../services/api/general_apis/default-currency-api';
import MultiLangApi from '../services/api/general_apis/multilanguage-api';
import Layout from '../components/Layout';
import '../styles/globals.scss';
import ErrorBoundary from '../components/ErrorBoundary';

const initializeStore = (dispatch: Dispatch, fetchedDataFromServer: any) => {
  const getCurrentTimestamp = Date.now();
  dispatch(setDefaultCurrencyValue(fetchedDataFromServer?.defaultCurrencyValue));
  dispatch(setMultiLingualData(fetchedDataFromServer?.multiLingualValues));
};

function MyApp({ Component, pageProps, fetchedDataFromServer }: AppProps & { fetchedDataFromServer: any }) {
  initializeStore(store.dispatch, fetchedDataFromServer);

  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <Layout>
              <ToastContainer position="top-right" autoClose={8000} hideProgressBar={false} newestOnTop={false} draggable={false} closeOnClick pauseOnHover />
              {/* Below condition is to check whether give complete access of site to guest user or user can access site only after authentication */}
              {CONSTANTS.ALLOW_GUEST_TO_ACCESS_SITE_EVEN_WITHOUT_AUTHENTICATION ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              )}
            </Layout>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </div>
  );
}
MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  let fetchedDataFromServer: any = {};

  let get_default_currency_value: any = await getMultiCurrencyValue();
  if (get_default_currency_value?.status === 200) {
    fetchedDataFromServer.defaultCurrencyValue = get_default_currency_value?.data?.message;
  } else {
    fetchedDataFromServer.defaultCurrencyValue = {};
  }
  let get_multi_lingual_data_value: any = await MultiLangApi();
  if (get_multi_lingual_data_value?.length > 0) {
    fetchedDataFromServer.multiLingualValues = get_multi_lingual_data_value;
  } else {
    fetchedDataFromServer.multiLingualValues = [];
  }

  return { ...appProps, fetchedDataFromServer };
};

export default MyApp;
