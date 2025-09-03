import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.scss';
import { MainRoutes } from './routes/MainRoutes';
import { AuthProvider } from './contexts/AuthContext';

// Create a root wrapper component
const Root = () => {
  return (
    <AuthProvider>
      <RouterProvider router={MainRoutes} />
    </AuthProvider>

  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
