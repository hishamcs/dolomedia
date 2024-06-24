import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client';
import store from './store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoaderProvider } from './context/LoaderContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </Provider>
);

reportWebVitals();  
