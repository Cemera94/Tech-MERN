import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import OrderFooter from './OrderFooter';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../store/loaderSlice';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    dispatch(setShowLoader(true));
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://127.0.0.1:5173/cart-shop',
      },
    });
    dispatch(setShowLoader(false));

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form>
      <PaymentElement />
      <OrderFooter onClick={handleSubmit} disabled={!stripe} />
    </form>
  );
};

export default CheckoutForm;
