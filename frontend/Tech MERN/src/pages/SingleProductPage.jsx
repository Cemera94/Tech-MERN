import { useEffect, useState } from 'react';
import { getSingleProduct } from '../services/productService';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../store/loaderSlice';
import ConvertPriceHook from '../utils/convertPrice';
import { IoCartOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import { setAddToCart } from '../store/cartSlice';

function SingleProductPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [product, setProduct] = useState({});
  const convertPrice = ConvertPriceHook();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setShowLoader(true));
      const res = await getSingleProduct(params.id);
      console.log(res.product);
      dispatch(setShowLoader(false));

      if (res.status === 'success') {
        setProduct(res.product);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container mx-auto flex flex-col justify-center items-center gap-[30px]'>
      {/* LEFT SIDE */}
      <div className='flex justify-center items-center w-[50%] border border-slate-400 rounded-[20px]'>
        <img
          src={`http://localhost:4000/uploads/${product.image}`}
          alt={product.title}
          className='w-[400px] h-[400px] object-contain'
        />
      </div>
      {/* RIGHT SIDE */}
      <div className='w-[50%] h-full flex flex-col gap-[50px] text-center'>
        <div className='flex flex-col gap-[40px]'>
          <h1 className='text-[30px]'>{product.title}</h1>
          <h3 className='text-[30px] font-bold'>
            {convertPrice(product.price)}
          </h3>
        </div>
        <div className='flex items-center justify-around'>
          <button
            className='flex items-center gap-[5px] text-[20px] bg-[#114b5f] px-[16px] py-[8px] rounded-[10px] text-[#fff]'
            onClick={() => dispatch(setAddToCart(product))}
          >
            Add to cart <IoCartOutline size={30} />
          </button>
          <button className='bg-[#114b5f] px-[16px] py-[8px] rounded-[10px] text-[#fff]'>
            <CiHeart size={30} />
          </button>
        </div>
        <h3 className='text-[20px] mt-[50px]'>{product.description}</h3>
      </div>
    </div>
  );
}

export default SingleProductPage;
