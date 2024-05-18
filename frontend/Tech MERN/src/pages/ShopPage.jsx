import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoader } from '../store/loaderSlice';
import { NavLink } from 'react-router-dom';

// icons
import { CiShoppingCart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import ConvertPriceHook from '../utils/convertPrice';
import { setAddToCart } from '../store/cartSlice';
import {
  setAddToFavorites,
  setRemoveFromFavorites,
} from '../store/favoritesSlice';
import { localStorageConfig } from '../config/localStorageConfig';
import CategoriesComponent from '../components/CategoriesComponent';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const { favoriteItems } = useSelector((state) => state.favoriteStore);

  const dispatch = useDispatch();
  const convertPrice = ConvertPriceHook();

  async function fetchData() {
    dispatch(setShowLoader(true));
    const res = await getAllProducts();

    dispatch(setShowLoader(false));
    if (res.status === 'success') {
      setProducts(res.products);
    }
  }
  useEffect(() => {
    if (favoriteItems.length) {
      localStorage.setItem(
        localStorageConfig.FAVORITES,
        JSON.stringify(favoriteItems)
      );
    }
  }, [favoriteItems]);

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <>
      <CategoriesComponent />
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
                      src={`https://backendtech-mern-q4mo.onrender.com/uploads/${el.image}`}
                      alt={el.title}
                      className='w-[70%] h-[100%] object-contain mt-[20px]'
                    />
                  </NavLink>
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
    </>
  );
}

export default ShopPage;
