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
import DashboardPage from './pages/DashboardPage.jsx';
import AdminProtect from './adminComponents/AdminProtect.jsx';
import ProductsPage from './adminComponents/adminPages/ProductsPage.jsx';
import AddProductPage from './adminComponents/adminPages/AddProductPage.jsx';
import AdminDashboardPage from './adminComponents/adminPages/AdminDashboardPage.jsx';
import CommentsPage from './adminComponents/adminPages/CommentsPage.jsx';
import SingleProductPage from './pages/SingleProductPage.jsx';
import CartShopPage from './pages/CartShopPage.jsx';

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
      {
        path: '/product/:id',
        element: <SingleProductPage />,
      },
      {
        path: 'cart-shop',
        element: <CartShopPage />,
      },
      {
        path: '/dashboard',
        element: (
          <AdminProtect>
            <DashboardPage />
          </AdminProtect>
        ),
        children: [
          {
            path: 'admin-dashboard',
            element: <AdminDashboardPage />,
          },
          {
            path: 'products',
            element: <ProductsPage />,
          },
          {
            path: 'add-product',
            element: <AddProductPage />,
          },
          {
            path: 'comments',
            element: <CommentsPage />,
          },
        ],
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
