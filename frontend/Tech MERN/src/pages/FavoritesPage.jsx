import { useSelector } from 'react-redux';
import ConvertPriceHook from '../utils/convertPrice';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const { favoriteItems } = useSelector((state) => state.favoriteStore);
  const convertPrice = ConvertPriceHook();

  return (
    <div className='container mx-auto flex flex-wrap gap-[50px] justify-around'>
      {favoriteItems.map((el, index) => (
        <div
          key={index}
          className='flex gap-[20px] w-[40%] items-center mb-[100px] '
        >
          <div className='w-[50%]'>
            <Link to={`/product/${el._id}`}>
              <img
                src={`https://backendtech-mern.onrender.com/uploads/${el.image}`}
                alt={el.title}
                className='w-[200px] h-[200px] object-contain cursor-pointer'
              />
            </Link>
          </div>
          <div className='w-[50%] flex flex-col gap-[20px]'>
            <h3 className='text-[20px] font-bold'>{el.title}</h3>
            <h3 className='text-[20px]'>{convertPrice(el.price)}</h3>
            <h3 className='text-[17px] text-slate-400'>{el.description}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
