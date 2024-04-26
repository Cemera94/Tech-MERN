import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { setDashboardView } from '../store/dashboardSlice';
import SidebarComponent from '../adminComponents/SidebarComponent';

function DashboardPage() {
  const { isDashboardView } = useSelector((state) => state.dashboardStore);
  const dispatch = useDispatch();

  const handleDashboardView = () => {
    dispatch(setDashboardView(false));
  };

  return (
    <div className='add-product flex p-0 '>
      {/* Left side */}
      <div className='w-[25%]'>
        <SidebarComponent />
      </div>
      {/* Right side */}
      <div className='w-[75%]'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;
