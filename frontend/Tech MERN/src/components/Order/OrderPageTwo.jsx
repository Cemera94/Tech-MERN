import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../config/stripeConfig';
import { setShowLoader } from '../../store/loaderSlice';
import { makePayment } from '../../services/paymentService';
import CheckoutForm from './CheckoutForm';

function OrderPageTwo() {
  const [secretKey, setSecretKey] = useState('');
  const dispatch = useDispatch();
  const { cartItems, cartTotalPrice } = useSelector((state) => state.cartStore);
  const { currency } = useSelector((state) => state.currencyStore);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: secretKey,
  };

  useEffect(() => {
    // api call ka bekendu
    const fetchData = async () => {
      dispatch(setShowLoader(true));
      const res = await makePayment({
        amount: cartTotalPrice,
        currency: currency,
      });
      if (res.status === 'success') {
        setSecretKey(res.secretKey);
      }
      dispatch(setShowLoader(false));
    };

    fetchData();
  }, []);

  return (
    <>
      {secretKey && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default OrderPageTwo;
