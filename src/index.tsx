import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.min.css';
import reportWebVitals from './reportWebVitals';
import './i18n/configs'
import { Provider } from 'react-redux'
import rootStore from './redux/store'
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react';


axios.defaults.headers['x-icode'] = 'qKhDxI15yz'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // StrictMode 严格模式 render会执行两次
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
