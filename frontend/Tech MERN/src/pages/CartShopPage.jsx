import { useSelector } from 'react-redux';
import ConvertPriceHook from '../utils/convertPrice';

function CartShopPage() {
  const { cartItems } = useSelector((state) => state.cartStore);
  const convertPrice = ConvertPriceHook();

  return (
    <div className='container mx-auto'>
      {/* LEFT SIDE */}
      <div className='w-[70%]'>
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
                  src={`http://localhost:4000/uploads/${item.image}`}
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
    </div>
  );
}

export default CartShopPage;
