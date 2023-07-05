import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {transitions, positions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import store from './store'
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Provider store={store}>
   <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>   </Provider>
  </BrowserRouter>
);

