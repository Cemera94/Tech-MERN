import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// react-router
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// pages
import ShopPage from './pages/ShopPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AuthorizationPage from './pages/AuthorizationPage.jsx';
import store from './store/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ShopPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/authorization',
        element: <AuthorizationPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
