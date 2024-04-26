import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCart, setCartTotalPrice } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { localStorageConfig } from '../../config/localStorageConfig';

function OrderPaymentMessage({ paymentMessage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMessage) {
      dispatch(setCart([]));
      dispatch(setCartTotalPrice(0));
      localStorage.removeItem(localStorageConfig.CART);
      localStorage.removeItem(localStorageConfig.CART_TOTAL_PRICE);
      setTimeout(() => navigate('/'), 5000);
    }
  }, [paymentMessage, dispatch, navigate]);

  return (
    <div>
      <h3>{paymentMessage}</h3>
    </div>
  );
}

export default OrderPaymentMessage;
