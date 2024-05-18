import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../store/loaderSlice';
import { getAllCategories } from '../../services/adminService';
import DeleteModal from './modals/DeleteModal';
import EditCategoryModal from './modals/EditCategoryModal';

function CategoriesPage() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchCategories = async () => {
    dispatch(setShowLoader(true));
    const res = await getAllCategories();
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setCategories(res.categories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (el) => {
    setIsDeleteModal(true);
    setCurrentCategory(el);
  };

  const handleUpdate = (el) => {
    setIsEdit(true);
    setCurrentCategory(el);
  };

  return (
    <div className='min-h-[100vh]'>
      <table className='table-auto w-full border-separate border-spacing-y-1'>
        <thead>
          <tr className='text-left font-bold text-[20px] bg-[#114b5f] text-[#fff] py-[10px]'>
            <th>No</th>
            <th>Image</th>
            <th>Title</th>
            <th className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((el, index) => {
            return (
              <tr key={index} className='text-left bg-[#fff] h-[100px]'>
                <td className='text-left'>{index + 1}</td>
                <td className='font-bold'>
                  <img
                    src={`https://backendtech-mern.onrender.com/uploads/${el.image}`}
                    alt={el.title}
                    className='w-[100px] h-[80px] object-fit'
                  />
                </td>
                <td className='font-bold w-[50%]'>{el.title}</td>

                <td>
                  <button
                    className='bg-[#114b5f] text-[#fff] px-[24px] py-[8px] rounded-[10px] ml-[150px]'
                    onClick={() => handleUpdate(el)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-red-500 text-[#fff] px-[24px] py-[8px] rounded-[10px] ml-[10px]'
                    onClick={() => handleDelete(el)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isDeleteModal && (
        <DeleteModal
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
          currentCategory={currentCategory}
          fetchCategories={fetchCategories}
        />
      )}
      {isEdit && (
        <EditCategoryModal
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          currentCategory={currentCategory}
          fetchCategories={fetchCategories}
        />
      )}
    </div>
  );
}

export default CategoriesPage;
