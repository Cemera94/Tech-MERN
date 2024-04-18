import { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ConvertPriceHook from '../utils/convertPrice';
import { CiCircleMinus } from 'react-icons/ci';
import { CiCirclePlus } from 'react-icons/ci';
import {
  setAddToCart,
  setHandleCount,
  setRemoveItem,
} from '../store/cartSlice';
import { toast } from 'react-toastify';
import { localStorageConfig } from '../config/localStorageConfig';

function CartShopComponent() {
  const [singleProduct, setSingleProduct] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const { cartItems, cartTotalPrice, isNewItem, isOldItem, isRemovedItem } =
    useSelector((state) => state.cartStore);
  const convertPrice = ConvertPriceHook();
  const dispatch = useDispatch();

  useEffect(() => {
    isNewItem && toast.success('Successfully added new item');
    isOldItem && toast.warning('Successfully increased quantity');
    isRemovedItem && toast.error('You have removed item from cart');
  }, [cartItems, isNewItem, isOldItem, isRemovedItem]);

  useEffect(() => {
    if (cartItems.length) {
      localStorage.setItem(localStorageConfig.CART, JSON.stringify(cartItems));
    }
    console.log(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    if (cartTotalPrice) {
      localStorage.setItem(localStorageConfig.CART_TOTAL_PRICE, cartTotalPrice);
    }
  }, [cartTotalPrice]);

  const handleRemove = (product) => {
    dispatch(setRemoveItem(product));
    localStorage.removeItem(localStorageConfig.CART);
    localStorage.removeItem(localStorageConfig.CART_TOTAL_PRICE);
  };

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={'/cart-shop'} className='flex gap-[5px] relative'>
        <IoCartOutline size={25} />

        {cartItems.length ? (
          <span className='flex justify-center items-center w-[20px] h-[20px] rounded-[50%] bg-[#114b5f] text-[#fff] absolute left-[20px] top-[-10px]'>
            {cartItems.length}{' '}
          </span>
        ) : null}
      </Link>
      {isHovered && cartItems.length > 0 && (
        <div className='absolute right-0 w-[500px] flex flex-col gap-[20px] py-[20px] px-[10px] z-10 bg-[#fff] border border-[#114b5f] rounded-[10px]'>
          <div className='flex flex-col gap-[10px]'>
            {cartItems.map((el, index) => {
              return (
                <div
                  key={index}
                  className='flex justify-between items-center z-10 '
                >
                  <img
                    src={`http://localhost:4000/uploads/${el.image}`}
                    alt={el.title}
                    className='w-[60px] h-[60px] object-contain'
                  />
                  <div className='w-[130px]'>
                    <h1>{el.title}</h1>
                  </div>
                  <div className='font-bold'>{convertPrice(el.totalPrice)}</div>
                  <div className='flex gap-[10px]'>
                    <span>Count:</span>
                    <div className='flex gap-[10px] items-center'>
                      <button
                        className='cursor-pointer'
                        name='decrement'
                        onClick={() =>
                          dispatch({
                            type: setHandleCount,
                            payload: {
                              element: el,
                              operation: 'decrement',
                            },
                          })
                        }
                      >
                        <CiCircleMinus size={20} />
                      </button>
                      <span className='font-bold'>{el.count}</span>
                      <span
                        className='cursor-pointer'
                        onClick={() =>
                          dispatch({
                            type: setHandleCount,
                            payload: {
                              element: el,
                              operation: 'increment',
                            },
                          })
                        }
                      >
                        <CiCirclePlus size={20} />
                      </span>
                    </div>
                  </div>
                  <div
                    className='cursor-pointer'
                    onClick={() => handleRemove(el)}
                  >
                    <FaRegTrashCan color='red' />
                  </div>
                </div>
              );
            })}
          </div>
          <div className='text-right'>
            <h1 className='font-bold text-[20px]'>
              Total: {convertPrice(cartTotalPrice)}
            </h1>
          </div>
          <div className='w-full'>
            <button className='bg-[#114b5f] text-[#fff] text-[16px] w-full py-[8px] rounded-[6px]'>
              <Link to={'/cart-shop'}>Checkout</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartShopComponent;
