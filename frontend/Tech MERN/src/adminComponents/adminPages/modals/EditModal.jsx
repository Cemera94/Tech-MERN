import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../../store/loaderSlice';
import { toast } from 'react-toastify';
import {
  getAllCategories,
  updatedProduct,
} from '../../../services/adminService';
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

function EditModal({ currentProduct, setisEditModal, isEditModal, fetchData }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    title: currentProduct.title,
    description: currentProduct.description,
    price: currentProduct.price,
    _id: currentProduct._id,
    image: currentProduct.image,
    category: currentProduct.category,
  });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formDataProduct;

    if (file) {
      formDataProduct = new FormData();

      formDataProduct.append('product', JSON.stringify(product));
      formDataProduct.append('file', file);
    }

    let hasFormData =
      formDataProduct &&
      formDataProduct.has('product') &&
      formDataProduct.has('file');

    if (product.title === '') {
      toast.error('Product title cannot be empty');
    } else if (product.description === '') {
      toast.error('Product description cannot be empty');
    } else if (product.price === '') {
      toast.error('Product price cannot be empty');
    } else if (product.category === '') {
      toast.error('Product category cannot be empty');
    }

    if (
      product.title === '' ||
      product.description === '' ||
      product.price === '' ||
      product.category === ''
    )
      return;

    dispatch(setShowLoader(true));
    const res = await updatedProduct(hasFormData ? formDataProduct : product);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setisEditModal(false);
      toast.success(res.message);
      fetchData();
    } else toast.error(res.message);
  };

  const handleinputChange = (e) => {
    const updatedProduct = { ...product };
    const { id, value } = e.target;
    updatedProduct[id] = value;
    setProduct(updatedProduct);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setShowLoader(true));
      const res = await getAllCategories();
      dispatch(setShowLoader(false));
      setCategories(res.categories);
    };

    fetchData();
  }, []);

  return (
    <div className='flex justify-center items-center text-center'>
      <Modal isOpen={true} ariaHideApp={false} style={customStyles}>
        <form
          onSubmit={handleSubmit}
          className='login-form flex flex-col w-full gap-[20px]'
        >
          <div className='flex flex-col gap-[10px] mb-[50px] text-center'>
            <h1 className='text-[30px]'>{currentProduct.title}</h1>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              placeholder={product.title}
              onChange={handleinputChange}
              className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
            />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              id='description'
              placeholder={product.description}
              onChange={handleinputChange}
              className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
            />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              placeholder={product.price}
              onChange={handleinputChange}
              className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
            />
          </div>
          <div className='flex flex-col gap-[10px] '>
            <label htmlFor='price'>Add Category</label>
            <select
              name='category'
              id='category'
              className='px-[16px] py-[8px] rounded-[10px] text-[#000]'
              onChange={(e) => handleOptionChange(e)}
            >
              <option></option>
              {categories.map((item, index) => {
                return (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <label htmlFor='image'>Image</label>
            <input
              type='file'
              id='image'
              placeholder='Product Image'
              onChange={handleFile}
              className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
            />
          </div>
          <div className='w-full flex justify-between mt-[50px]'>
            <button
              className='bg-[#114b5f] px-[24px] py-[8px] rounded-[10px] outline-none text-white'
              type='submit'
            >
              Update Product
            </button>
            <button
              className='bg-red-500 px-[24px] py-[8px] rounded-[10px] outline-none text-white'
              onClick={() => setisEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditModal;
