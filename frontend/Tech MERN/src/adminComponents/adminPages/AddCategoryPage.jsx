import { useRef, useState } from 'react';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../store/loaderSlice';
import { addCategory } from '../../services/adminService';
import { toast } from 'react-toastify';

function CategoriesPage() {
  const [category, setCategory] = useState({
    title: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = new FormData();

    newCategory.append('category', JSON.stringify(category));
    newCategory.append('file', file);

    dispatch(setShowLoader(true));
    const res = await addCategory(newCategory);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      formRef.current.reset();
      setCategory({
        title: '',
        description: '',
      });
      setFile(null);
      toast.success(res.message);
    } else toast.error(res.message);
  };

  const handleInputChange = (e) => {
    const newCategory = { ...category };
    const { id, value } = e.target;
    newCategory[id] = value;
    setCategory(newCategory);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className='container mx-auto w-[100%] h-[100vh] flex flex-col items-center justify-center text-[#fff]'>
      <form
        onSubmit={handleSubmit}
        className='login-form flex flex-col w-[50%] gap-[20px]'
        ref={formRef}
      >
        <div className='flex flex-col gap-[10px] mb-[50px]'>
          <h1 className='text-[30px]'>Add Category</h1>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='text'
            id='title'
            placeholder='Type Product Title'
            onChange={handleInputChange}
            className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
          />
        </div>
        <div className='flex flex-col gap-[10px]'>
          <Label htmlFor='description'>Description</Label>
          <Input
            type='text'
            id='description'
            placeholder='Product Description'
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
          Add Category
        </Button>
      </form>
    </div>
  );
}

export default CategoriesPage;
