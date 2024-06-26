import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, setSymbol } from '../store/currencySlice';
import { useEffect, useState } from 'react';
import { setToggle } from '../store/authorizationSlice';
import { localStorageConfig } from '../config/localStorageConfig';
import { removeUser, setUser } from '../store/userSlice';
import { FaChevronDown } from 'react-icons/fa6';
import { setDashboardView } from '../store/dashboardSlice';
import CartShopComponent from './CartShopComponent';
import FavoritesComponent from './FavoritesComponent';

function NavigationComponent() {
  const { currency, symbol } = useSelector((state) => state.currencyStore);
  const { user } = useSelector((state) => state.userStore);
  const { toggle } = useSelector((state) => state.authorizationStore);
  const { isDashboardView } = useSelector((state) => state.dashboardStore);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(localStorageConfig.CURRENCY, currency);
    if (currency === 'EUR') {
      dispatch(setSymbol('€'));
    } else if (currency === 'USD') {
      dispatch(setSymbol('$'));
    } else if (currency === 'RSD') {
      dispatch(setSymbol('RSD'));
    }
  }, [currency]);

  const HandleCurrency = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  const handleToggle = () => {
    dispatch(setToggle(!toggle));
  };

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem(localStorageConfig.USER);
  };

  const handleDashboardView = () => {
    dispatch(setDashboardView(true));
  };

  return (
    <div className='container mx-auto pt-[20px] pb-[20px]'>
      <div className='navigation-wrapper flex items-center justify-between'>
        <div className='currency flex items-center gap-[5px]'>
          <label htmlFor='currency'>Currency</label>
          <select
            name='currency'
            id='currency'
            className='outline-none cursor-pointer'
            onChange={HandleCurrency}
            defaultValue={currency}
          >
            <option value='EUR'>EUR</option>
            <option value='USD'>USD</option>
            <option value='RSD'>RSD</option>
          </select>
        </div>
        <div className='navigation flex items-center'>
          <nav>
            <ul className='flex gap-[50px] items-center'>
              <li>
                <Link to={'/'}>Shop</Link>
              </li>
              <li>
                <Link to={'/contact'}>Contact</Link>
              </li>
              <li className='flex gap-[10px]'>
                {/* ShopCart */}
                <CartShopComponent />
                <FavoritesComponent />
              </li>
              {localStorage.getItem(localStorageConfig.USER) ? (
                <div className='dropdown'>
                  <li className='dropbtn cursor-pointer flex items-center gap-[5px]'>
                    <a>{user.username}</a>
                    <div className='icon'>
                      <FaChevronDown />
                    </div>
                  </li>
                  <div className='dropdown-content py-[8px] rounded-[10px]'>
                    <Link
                      to={'/profile'}
                      className='py-[8px] px-[16px] flex justify-start'
                    >
                      Profile
                    </Link>
                    {user.role === 'admin' ? (
                      <Link
                        to={'/dashboard/admin-dashboard'}
                        className='py-[8px] px-[16px]'
                        onClick={() => handleDashboardView()}
                      >
                        Dashboard
                      </Link>
                    ) : null}
                    <Link
                      to={'/authorization'}
                      className='py-[8px] px-[16px]'
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <li>
                  <Link to={'/authorization'} onClick={() => handleToggle()}>
                    {toggle ? 'Login' : 'Register'}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavigationComponent;
