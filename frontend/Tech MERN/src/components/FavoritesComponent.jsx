import { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { localStorageConfig } from '../config/localStorageConfig';
import { Link } from 'react-router-dom';
import ConvertPriceHook from '../utils/convertPrice';
import { FaRegTrashCan } from 'react-icons/fa6';
import { setRemoveFromFavorites } from '../store/favoritesSlice';
import { setShowLoader } from '../store/loaderSlice';

function FavoritesComponent() {
  const { favoriteItems } = useSelector((state) => state.favoriteStore);
  const [isHovered, setIsHovered] = useState(false);
  const convertPrice = ConvertPriceHook();
  const dispatch = useDispatch();

  /* useEffect(() => {
    if (favoriteItems.length) {
      localStorage.setItem(
        localStorageConfig.FAVORITES,
        JSON.stringify(favoriteItems)
      );
    }
  }, [favoriteItems]); */

  const handleRemove = async (el) => {
    dispatch(setRemoveFromFavorites(el));
    localStorage.removeItem(localStorageConfig.FAVORITES);
  };

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={'/favorites'} className='flex gap-[5px] relative'>
        <CiHeart size={25} />

        {favoriteItems.length ? (
          <span className='flex justify-center items-center w-[20px] h-[20px] rounded-[50%] bg-[#114b5f] text-[#fff] absolute left-[20px] top-[-10px]'>
            {favoriteItems.length}{' '}
          </span>
        ) : null}
      </Link>
      {isHovered && favoriteItems.length > 0 && (
        <div className='absolute right-0 w-[500px] flex flex-col gap-[20px] py-[20px] px-[10px] z-10 bg-[#fff] border border-[#114b5f] rounded-[10px]'>
          <div className='flex flex-col gap-[10px]'>
            {favoriteItems.map((el, index) => {
              return (
                <div
                  key={index}
                  className='flex justify-around items-center z-10 '
                >
                  <img
                    src={`https://backendtech-mern-q4mo.onrender.com/uploads/${el.image}`}
                    alt={el.title}
                    className='w-[60px] h-[60px] object-contain'
                  />
                  <div className='w-[130px]'>
                    <h1>{el.title}</h1>
                  </div>
                  <div className='font-bold'>{convertPrice(el.price)}</div>
                </div>
              );
            })}
          </div>
          <div className='text-right'></div>
          <div className='w-full'>
            <button className='bg-[#1a936f] text-[#fff] text-[16px] w-full py-[8px] rounded-[6px]'>
              <Link to={'/favorites'}>Check All Items</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoritesComponent;
