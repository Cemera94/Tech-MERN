import Modal from 'react-modal';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import Button from '../../../components/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../../store/loaderSlice';
import { toast } from 'react-toastify';
import { updateCategory } from '../../../services/adminService';

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

function EditCategoryModal({
  isEdit,
  setIsEdit,
  currentCategory,
  fetchCategories,
}) {
  const [category, setCategory] = useState({
    title: currentCategory.title,
    description: currentCategory.description,
    image: currentCategory.image,
    _id: currentCategory._id,
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const newCategory = { ...category };
    const { id, value } = e.target;
    newCategory[id] = value;
    setCategory(newCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formDataCategory;

    if (file) {
      formDataCategory = new FormData();

      formDataCategory.append('category', JSON.stringify(category));
      formDataCategory.append('file', file);
    }

    const hasFormData =
      formDataCategory &&
      formDataCategory.has('file') &&
      formDataCategory.has('category');

    if (category.title === '') {
      toast.error('Please select a category title');
    } else if (category.description === '') {
      toast.error('Please select a category description');
    }

    if (category.title === '' || category.description === '') {
      return;
    }

    dispatch(setShowLoader(true));
    const res = await updateCategory(hasFormData ? formDataCategory : category);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setIsEdit(false);
      toast.success(res.message);
      fetchCategories();
    } else toast.error(res.message);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className='flex justify-center items-center text-center'>
      <Modal isOpen={true} ariaHideApp={false} style={customStyles}>
        <form
          onSubmit={handleSubmit}
          className='login-form flex flex-col gap-[20px]'
        >
          <div className='flex justify-center mb-[20px]'>
            <h1 className='text-[30px]'>Update Category</h1>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <Label htmlFor='title'>Title</Label>
            <Input
              type='text'
              id='title'
              placeholder={currentCategory.title}
              onChange={handleInputChange}
              className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
            />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <Label htmlFor='description'>Description</Label>
            <Input
              type='text'
              id='description'
              placeholder={currentCategory.description}
              onChange={handleInputChange}
              className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
            />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <Label htmlFor='image'>Image</Label>
            <Input
              type='file'
              id='image'
              placeholder='Product Image'
              onChange={handleFile}
              className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
            />
          </div>
          <Button className='bg-[#114b5f] py-[8px] rounded-[10px] outline-none text-white'>
            Update Category
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default EditCategoryModal;
