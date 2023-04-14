import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from "./context/darkModeContext";
import { store } from './redux/store'
import { Provider } from 'react-redux'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);
