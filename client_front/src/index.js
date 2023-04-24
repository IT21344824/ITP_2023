import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from "./context/darkModeContext";
import { store ,persistor} from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>

        <Provider store={store}>
          <PersistGate loading={"loading"} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>

      </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
