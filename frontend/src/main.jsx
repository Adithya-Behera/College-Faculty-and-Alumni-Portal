import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import  store  from './redux/store'; // Redux store configuration
import App from './App';
import './index.css'; // Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
