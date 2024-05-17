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
import UsersPage from './adminComponents/adminPages/UsersPage.jsx';
import AddCategoryPage from './adminComponents/adminPages/AddCategoryPage.jsx';
import CategoriesPage from './adminComponents/adminPages/CategoriesPage.jsx';
import AdminDashboardPage from './adminComponents/adminPages/AdminDashboardPage.jsx';
import CommentsPage from './adminComponents/adminPages/CommentsPage.jsx';
import SingleProductPage from './pages/SingleProductPage.jsx';
import CartShopPage from './pages/CartShopPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProductsByCategory from './pages/ProductsByCategory.jsx';

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
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/product/:id',
        element: <SingleProductPage />,
      },
      {
        path: '/category/:title',
        element: <ProductsByCategory />,
      },
      {
        path: 'cart-shop',
        element: <CartShopPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
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
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'add-category',
            element: <AddCategoryPage />,
          },
          {
            path: 'categories',
            element: <CategoriesPage />,
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
