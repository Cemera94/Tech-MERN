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

  return (
    <div className=''>
      {/* Loader */}
      <LoaderComponent />
      {/* Navigation */}
      {!isDashboardView && (
        <div className=' border-b-2 border-slate-200 mb-[100px]'>
          <NavigationComponent />
        </div>
      )}

      {/* Outlet */}
      <Outlet />
      {/* Toast */}
      <ToastContainer
        position='top-center'
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
