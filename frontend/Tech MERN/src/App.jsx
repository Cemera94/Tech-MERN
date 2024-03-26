import { Outlet } from 'react-router-dom';
import NavigationComponent from './components/NavigationComponent';
import './config/axiosConfig';

function App() {
  return (
    <div className=''>
      {/* Navigation */}
      <div className=' border-b-2 border-slate-100 mb-[40px]'>
        <NavigationComponent />
      </div>
      {/* Outlet */}
      <Outlet />
    </div>
  );
}

export default App;
