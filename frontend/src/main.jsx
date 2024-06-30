import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import userReducer from './features/user'
import { configureStore } from '@reduxjs/toolkit'
import { GoogleOAuthProvider } from "@react-oauth/google"


const store = configureStore({
  reducer: {
    user: userReducer
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
