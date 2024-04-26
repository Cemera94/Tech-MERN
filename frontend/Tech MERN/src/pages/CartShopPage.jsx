import { useSelector } from 'react-redux';
import ConvertPriceHook from '../utils/convertPrice';
import OrderPageOne from '../components/Order/OrderPageOne';
import OrderFooter from '../components/Order/OrderFooter';
import OrderPageTwo from '../components/Order/OrderPageTwo';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderPaymentMessage from '../components/Order/OrderPaymentMessage';

function CartShopPage() {
  const { cartItems } = useSelector((state) => state.cartStore);
  const { currentStep } = useSelector((state) => state.orderStore);
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentMessage, setPaymentMessage] = useState('');

  const convertPrice = ConvertPriceHook();

  useEffect(() => {
    if (searchParams.get('redirect_status')) {
      setPaymentMessage(searchParams.get('redirect_status'));
    }
  }, [searchParams]);

  return (
    <div className='container mx-auto'>
      {cartItems.length ? (
        <>
          {currentStep === 1 && <OrderPageOne />}
          {currentStep === 2 && <OrderPageTwo />}
        </>
      ) : (
        <>{!paymentMessage && <h3>Your cart is empty</h3>}</>
      )}
      {paymentMessage && (
        <OrderPaymentMessage paymentMessage={paymentMessage} />
      )}
    </div>
  );
}

export default CartShopPage;
