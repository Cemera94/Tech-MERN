import { Outlet } from 'react-router-dom';
import NavigationComponent from './components/NavigationComponent';
import './config/axiosConfig';
import LoaderComponent from './components/LoaderComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className=''>
      {/* Loader */}
      <LoaderComponent />
      {/* Navigation */}
      <div className=' border-b-2 border-slate-200 mb-[100px]'>
        <NavigationComponent />
      </div>
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
