import { useDispatch, useSelector } from 'react-redux';
import ConvertPriceHook from '../../utils/convertPrice';
import { setCartCouponPrice } from '../../store/cartSlice';
import { useState } from 'react';
import OrderFooter from './OrderFooter';

function OrderPageOne() {
  const { cartItems, cartTotalPrice, cartCouponTotalPrice } = useSelector(
    (state) => state.cartStore
  );
  const [coupon, setCoupon] = useState('');
  const dispatch = useDispatch();

  const convertPrice = ConvertPriceHook();

  const handleCoupon = (e) => {
    if (e.target.value === 'jovan') {
      setCoupon('jovan');
    }
  };

  const handleCouponPrice = () => {
    dispatch(setCartCouponPrice(cartTotalPrice * 0.1));
  };

  const handleFullPrice = () => {
    dispatch(setCartCouponPrice(cartTotalPrice));
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className=' w-[70%] order-products'>
          <div className='flex w-full text-[20px] mb-[50px]'>
            <h3 className='w-[50%]'>Product</h3>
            <h3 className='w-[15%]'>Price</h3>
            <h3 className='w-[15%]'>Quantity</h3>
            <h3 className='w-[20%]'>Total Price</h3>
          </div>
          {cartItems.map((item, index) => {
            return (
              <div key={index} className='w-full flex items-center'>
                <div className='flex gap-[50px] w-[50%] items-center text-left'>
                  <img
                    src={`https://backendtech-mern-q4mo.onrender.com/uploads/${item.image}`}
                    alt={item.title}
                    className='w-[100px] h-[100px] object-contain'
                  />
                  <h3 className='text-[20px]'>{item.title}</h3>
                </div>
                <div className='w-[15%]'>
                  <h3>{convertPrice(item.price)}</h3>
                </div>
                <div className='w-[15%]'>
                  <h3 className='ml-[30px] font-bold'>{item.count}</h3>
                </div>
                <div>
                  <h3 className='font-bold'>{convertPrice(item.totalPrice)}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className='w-[30%] flex flex-col gap-[30px] px-[50px]'>
          <div className='w-full flex justify-center mb-[50px]'>
            <h3 className='text-[20px]'>Cart Total</h3>
          </div>
          <div className='text-[20px] flex flex-col gap-[40px]'>
            <h3 className='font-bold'>Total: {convertPrice(cartTotalPrice)}</h3>
            <div className='flex flex-col gap-[10px]'>
              <label htmlFor='coupon'>Coupon:</label>
              <input
                type='text'
                id='coupon'
                placeholder='Type Coupon Here'
                className='outline-none'
                onChange={(e) => handleCoupon(e)}
              />
            </div>
          </div>
          <div className='text-[20px] mt-[50px]'>
            <h3 className='font-bold'>
              {coupon === 'jovan' && handleCouponPrice()}
              {coupon !== 'jovan' && handleFullPrice()}
              Total: {convertPrice(cartCouponTotalPrice)}
            </h3>
          </div>
        </div>
      </div>
      <OrderFooter />
    </>
  );
}

export default OrderPageOne;
