import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../store/loaderSlice';
import { getAllCategories } from '../services/adminService';
import { Link } from 'react-router-dom';

function CategoriesComponent() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    dispatch(setShowLoader(true));
    const res = await getAllCategories();
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setCategories(res.categories);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex justify-between py-[10px] mb-[100px] bg-[#1a936f] text-[#fff] px-[80px]'>
      {categories.map((item, index) => {
        return (
          <div key={index}>
            <Link to={`/category/${item.title.toLowerCase()}`}>
              <button>{item.title}</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default CategoriesComponent;
