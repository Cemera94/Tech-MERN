import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setShowLoader } from '../store/loaderSlice';
import {
  getCategory,
  getProductsByCategory,
} from '../services/categoryService';
import {
  setAddToFavorites,
  setRemoveFromFavorites,
} from '../store/favoritesSlice';
import { localStorageConfig } from '../config/localStorageConfig';
import { FaHeart } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import ConvertPriceHook from '../utils/convertPrice';
import { setAddToCart } from '../store/cartSlice';
import { CiShoppingCart } from 'react-icons/ci';

function ProductsByCategory() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [category, setCategory] = useState({});
  const { favoriteItems } = useSelector((state) => state.favoriteStore);
  const convertPrice = ConvertPriceHook();

  const fetchData = async () => {
    dispatch(setShowLoader(true));
    const res = await getProductsByCategory(params.title);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setProducts(res.products);
    }
  };

  const fetchCategory = async () => {
    if (params.title.includes(' ')) {
      let words = params.title.split(' ');
      let newParams = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      let joinedWords = newParams.join(' ');

      dispatch(setShowLoader(true));
      const res = await getCategory(joinedWords);
      dispatch(setShowLoader(false));

      if (res.status === 'success') {
        setCategory(res.category);
      }
    }

    const paramsNew =
      params.title.charAt(0).toUpperCase() + params.title.slice(1);

    dispatch(setShowLoader(true));
    const res = await getCategory(paramsNew);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setCategory(res.category);
    }
  };

  const handleHeartClick = (el) => {
    const isFavorited = favoriteItems.some((item) => item._id === el._id);
    if (isFavorited) {
      // Item is already favorited, handle unfavoriting logic here
      // For example, you can remove the item from the favoriteItems array
      dispatch(setRemoveFromFavorites(el));
      localStorage.removeItem(localStorageConfig.FAVORITES);
    } else {
      // Item is not favorited, handle favoriting logic here
      dispatch(setAddToFavorites(el));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className='container mx-auto'>
      <div className='relative mb-[100px]'>
        <div className='w-[100%]'>
          <img
            src={`https://backendtech-mern.onrender.com/uploads/${category.image}`}
            alt={category.title}
            className='w-full max-h-[500px] object-cover mt-[20px]'
          />
        </div>
        <div className='bg-[#000] opacity-[0.7] absolute top-0 bottom-0 left-0 right-0'></div>
        <div className=' flex flex-col gap-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#fff]'>
          <h1 className='text-[50px] font-bold'>{category.title}</h1>
          <p className='text-[20px]'>{category.description}</p>
        </div>
      </div>
      <div className='flex flex-wrap justify-center gap-[40px]'>
        {products.length > 0 &&
          products.map((el, index) => {
            return (
              <div
                key={index}
                className='w-[20%] flex flex-col justify-between p-[20px] gap-[40px] text-center mb-[50px] border border-transparent hover:border-[#114b5f] rounded-[20px] cursor-pointer'
              >
                <div className='w-full h-[150px] flex justify-center items-center relative'>
                  <Link
                    to={`/product/${el._id}`}
                    className='flex justify-center items-center'
                  >
                    <img
                      src={`https://backendtech-mern.onrender.com/uploads/${el.image}`}
                      alt={el.title}
                      className='w-[70%] h-[100%] object-contain mt-[20px]'
                    />
                  </Link>
                  <div className='absolute top-[0px] right-[0px]'>
                    <button onClick={() => handleHeartClick(el)}>
                      {favoriteItems.some((item) => item._id === el._id) ? (
                        <FaHeart size={25} color='#ff9885' />
                      ) : (
                        <CiHeart size={25} color='#ff9885' />
                      )}
                    </button>
                  </div>
                </div>
                <div className='flex flex-col gap-[30px]'>
                  <h2 className='text-[24px]'>{el.title}</h2>
                  <h3 className='text-[15px]'>{el.description}</h3>
                </div>
                <div className='flex justify-between items-center'>
                  <h3 className='text-[20px]'>{convertPrice(el.price)}</h3>

                  <button
                    className='w-[50px] h-[50px] rounded-[50%]  flex justify-center items-center'
                    onClick={() => dispatch(setAddToCart(el))}
                  >
                    <CiShoppingCart size={35} color='#114b5f' />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductsByCategory;
