import { Outlet, useLocation } from 'react-router-dom';
import NavigationComponent from './components/NavigationComponent';
import './config/axiosConfig';
import LoaderComponent from './components/LoaderComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { localStorageConfig } from './config/localStorageConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';
import { setDashboardView } from './store/dashboardSlice';
import { setAddToCart, setCart, setCartTotalPrice } from './store/cartSlice';
import { setCurrentStep, setRestartCurrentStep } from './store/orderSlice';
import { setFavorites } from './store/favoritesSlice';
import CategoriesComponent from './components/CategoriesComponent';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isDashboardView } = useSelector((state) => state.dashboardStore);

  // Uzimamo korisnika iz localStoragea i ukoliko ga imamo preko dispatcha ga setujemo u redux
  useEffect(() => {
    const user = localStorage.getItem(localStorageConfig.USER);
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  // Proveravamo na kojoj smo lokaciji i ukoliko smo na dashboardu postavljamo redux na true a čim napustimo lokaciju setujemo na false
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      dispatch(setDashboardView(true));
    } else {
      dispatch(setDashboardView(false));
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname.startsWith('/cart-shop')) {
      dispatch(setRestartCurrentStep(1));
    }
  }, [location]);

  /* SETUJEMO KORPU UKOLIKO POSTOJI U LOCALSTORAGE */
  useEffect(() => {
    const cart = localStorage.getItem(localStorageConfig.CART);
    if (cart) {
      dispatch(setCart(JSON.parse(cart)));
    }
  }, []);
  useEffect(() => {
    const favorites = localStorage.getItem(localStorageConfig.FAVORITES);
    if (favorites) {
      dispatch(setFavorites(JSON.parse(favorites)));
    }
  }, []);

  useEffect(() => {
    const cartTotalPrice = localStorage.getItem(
      localStorageConfig.CART_TOTAL_PRICE
    );
    if (cartTotalPrice) {
      dispatch(setCartTotalPrice(cartTotalPrice));
    }
  }, []);

  return (
    <div className=''>
      {/* Loader */}
      <LoaderComponent />
      {/* Navigation */}
      {!isDashboardView && (
        <div className=' border-b-2 border-slate-200'>
          <NavigationComponent />
        </div>
      )}

      {/* Outlet */}
      <Outlet />
      {/* Toast */}
      <ToastContainer
        position='top-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition:Bounce
        theme='light'
      />
    </div>
  );
}

export default App;
