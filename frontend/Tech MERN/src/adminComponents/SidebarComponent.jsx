import { listModels } from './dashboardArray/listModels';
import { NavLink } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';

function SidebarComponent() {
  const changeView = () => {
    // Naviguj nas - menjaj view
  };

  return (
    <div className='flex flex-col gap-[70px] bg-[#114b5f] text-[#fff] p-[10px] h-[100vh] relative'>
      <h1 className='text-[30px] font-bold ml-2 mt-5'>Admin Dashboard</h1>
      <div className='flex flex-col'>
        {/* Sidebar links */}
        {listModels.map((item, key) => {
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className='p-4 text-[20px] w-full flex items-center gap-[15px]'
              onClick={() => changeView()}
            >
              <i className={item.icon}></i>
              {item.name}
            </NavLink>
          );
        })}
      </div>
      <div className='return absolute bottom-10 flex items-center gap-[2px] ml-[5px]'>
        <div className='svg'>
          <FaAnglesLeft size={20} />
        </div>
        <NavLink to={'/'} className=' text-[25px]'>
          Return
        </NavLink>
      </div>
    </div>
  );
}

export default SidebarComponent;
