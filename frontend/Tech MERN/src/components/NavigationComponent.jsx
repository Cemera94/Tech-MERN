import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, setSymbol } from '../store/currencySlice';
import { useEffect } from 'react';
import { setToggle } from '../store/authorizationSlice';
import { localStorageConfig } from '../config/localStorageConfig';

function NavigationComponent() {
  const dispatch = useDispatch();
  const { currency, symbol } = useSelector((state) => state.currencyStore);
  const { toggle } = useSelector((state) => state.authorizationStore);

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
          <span>{symbol}</span>
        </div>
        <div className='navigation flex items-center'>
          <nav>
            <ul className='flex gap-[15px]'>
              <li>
                <NavLink to={'/'}>Shop</NavLink>
              </li>
              <li>
                <NavLink to={'/contact'}>Contact</NavLink>
              </li>
              <li>
                <NavLink to={'/authorization'} onClick={() => handleToggle()}>
                  {toggle ? 'Login' : 'Register'}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavigationComponent;
