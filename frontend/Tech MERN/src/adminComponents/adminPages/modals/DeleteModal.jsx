import { useState } from 'react';
import Modal from 'react-modal';
import {
  deleteSingleCategory,
  deleteSingleProduct,
} from '../../../services/adminService';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../../store/loaderSlice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 1px 8px rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    position: 'fixed',
    backgroundColor: '#0e0e0ead',
  },
};

function DeleteModal({
  currentProduct,
  setIsDeleteModal,
  isDeleteModal,
  fetchData,
  fetchCategories,
  currentCategory,
}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDeleteCurrentProduct = async () => {
    if (location.pathname === '/dashboard/products') {
      dispatch(setShowLoader(true));
      const res = await deleteSingleProduct({
        productID: currentProduct._id,
        productImage: currentProduct.image,
      });
      dispatch(setShowLoader(false));

      if (res.status === 'success') {
        setIsDeleteModal(false);
        toast.success(res.message);
        fetchData();
      } else toast.error(res.message);
    }

    if (location.pathname === '/dashboard/categories') {
      dispatch(setShowLoader(true));
      const res = await deleteSingleCategory({
        categoryID: currentCategory._id,
        categoryImage: currentCategory.image,
        categoryTitle: currentCategory.title,
      });
      dispatch(setShowLoader(false));

      if (res.status === 'success') {
        setIsDeleteModal(false);
        toast.success(res.message);
        fetchCategories();
      } else toast.error(res.message);
    }
  };

  return (
    <div className='flex justify-center items-center text-center'>
      {console.log(currentCategory)}
      <Modal isOpen={isDeleteModal} ariaHideApp={false} style={customStyles}>
        <h1 className='text-center text-[20px]'>
          Are you sure you want to delete{' '}
          {location.pathname === '/dashboard/products' ? (
            <span className='font-bold'>{currentProduct.title}</span>
          ) : (
            <span className='font-bold'>{currentCategory.title}</span>
          )}
        </h1>
        <div className='flex justify-between mt-[30px]'>
          <button
            className='bg-[#114b5f] text-[#fff] px-[24px] py-[8px] rounded-[10px]'
            onClick={() => setIsDeleteModal(false)}
            type='button'
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-[#fff] px-[24px] py-[8px] rounded-[10px]'
            onClick={() => handleDeleteCurrentProduct()}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteModal;
