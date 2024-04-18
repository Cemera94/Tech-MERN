import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoader } from '../store/loaderSlice';
import { NavLink } from 'react-router-dom';

// icons
import { IoCartOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import ConvertPriceHook from '../utils/convertPrice';

function ShopPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const convertPrice = ConvertPriceHook();

  useEffect(() => {
    async function fetchData() {
      dispatch(setShowLoader(true));
      const res = await getAllProducts();

      dispatch(setShowLoader(false));
      if (res.status === 'success') {
        setProducts(res.products);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='container mx-auto flex flex-wrap justify-center gap-[40px]'>
      {products.length > 0 &&
        products.map((el, index) => {
          return (
            <div
              key={index}
              className='w-[20%] flex flex-col justify-between p-[20px] gap-[40px] text-center mb-[50px] border border-transparent hover:border-[#114b5f] rounded-[20px] cursor-pointer'
            >
              <div className='w-full h-[150px] flex justify-center items-center relative'>
                <NavLink
                  to={`/product/${el._id}`}
                  className='flex justify-center items-center'
                >
                  <img
                    src={`http://localhost:4000/uploads/${el.image}`}
                    alt={el.title}
                    className='w-[70%] h-[100%] object-contain mt-[20px]'
                  />
                </NavLink>
                <div className='absolute top-[-5px] right-[-5px]'>
                  <button>
                    <CiHeart size={30} color='#114b5f' />
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-[30px]'>
                <h2 className='text-[24px]'>{el.title}</h2>
                <h3 className='text-[15px]'>{el.description}</h3>
              </div>
              <div className='flex justify-between items-center'>
                <h3 className='text-[20px]'>{convertPrice(el.price)}</h3>

                <button className='w-[50px] h-[50px] rounded-[50%] bg-[#114b5f] flex justify-center items-center'>
                  <IoCartOutline size={30} color='#fff' />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ShopPage;
