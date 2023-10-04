import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProviderComponent } from './auth/AuthProvider.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <AuthProviderComponent>
          <App />
        </AuthProviderComponent>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>,
);
