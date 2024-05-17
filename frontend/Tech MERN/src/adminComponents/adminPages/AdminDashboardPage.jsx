import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../store/loaderSlice';
import { getAllProducts } from '../../services/productService';
import setIntervals from '../../utils/setInterval';
import { getAllCategories, getAllUsers } from '../../services/adminService';
import { getAllComments } from '../../services/commentService';

function AdminDashboardPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [displayedProductCount, setDisplayedProductCount] = useState(0);
  const [displayedCategoryCount, setDisplayedCategoryCount] = useState(0);
  const [displayedCommentsCount, setDisplayedCommentsCount] = useState(0);
  const [displayedUsersCount, setDisplayedUsersCount] = useState(0);

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    dispatch(setShowLoader(true));
    const res = await getAllProducts();
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setAllProducts(res.products);
      setIntervals(setDisplayedProductCount, res.products.length);
    }
  };

  const fetchCategories = async () => {
    dispatch(setShowLoader(true));
    const res = await getAllCategories();
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setAllCategories(res.categories);
      setIntervals(setDisplayedCategoryCount, res.categories.length);
    }
  };

  const fetchComments = async () => {
    dispatch(setShowLoader(true));
    const res = await getAllComments();
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setAllComments(res.allComments);
      setIntervals(setDisplayedCommentsCount, res.allComments.length);
    }
  };

  const fetchUsers = async () => {
    dispatch(setShowLoader(true));
    const res = await getAllUsers();
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setAllUsers(res.users);
      setIntervals(setDisplayedUsersCount, res.users.length);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchComments();
    fetchUsers();
  }, []);

  return (
    <div className='h-[100vh] text-[#fff] py-[50px] flex flex-col gap-[100px]'>
      <h1 className='text-[30px] text-center'>Admin Dashboard Page</h1>
      <div className='text-[30px] flex flex-wrap gap-[100px]'>
        <div className=' flex flex-col rounded-[20px] text-center gap-[20px] border border-[#114b5f] px-[25px] py-[50px]'>
          <h1 className='text-[30px]'>Number of Products</h1>
          <h1>{displayedProductCount}</h1>
        </div>
        <div className=' flex flex-col rounded-[20px] text-center gap-[20px] border border-[#114b5f] px-[25px] py-[50px]'>
          <h1 className='text-[30px]'>Number of Categories</h1>
          <h1>{displayedCategoryCount}</h1>
        </div>
        <div className=' flex flex-col rounded-[20px] text-center gap-[20px] border border-[#114b5f] px-[25px] py-[50px]'>
          <h1 className='text-[30px]'>Number of Comments</h1>
          <h1>{displayedCommentsCount}</h1>
        </div>
        <div className=' flex flex-col rounded-[20px] text-center gap-[20px] border border-[#114b5f] px-[25px] py-[50px]'>
          <h1 className='text-[30px]'>Number of Users</h1>
          <h1>{displayedUsersCount}</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
