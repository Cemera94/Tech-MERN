import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { useEffect, useRef, useState } from 'react';
import { addProduct, getAllCategories } from '../../services/adminService';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoader } from '../../store/loaderSlice';
import { toast } from 'react-toastify';

function AddProductPage() {
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
  });
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const newProduct = { ...product };
    const { id, value } = e.target;
    newProduct[id] = value;
    setProduct(newProduct);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = new FormData();

    newProduct.append('product', JSON.stringify(product));
    newProduct.append('file', file);

    dispatch(setShowLoader(true));
    const res = await addProduct(newProduct);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      formRef.current.reset();
      setProduct({
        title: '',
        description: '',
        price: '',
      });
      setFile(null);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
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
    <div className='container mx-auto w-[100%] h-[100vh] flex flex-col items-center justify-center text-[#fff]'>
      <form
        onSubmit={handleSubmit}
        className='login-form flex flex-col w-[50%] gap-[20px]'
        ref={formRef}
      >
        <div className='flex flex-col gap-[10px] mb-[50px]'>
          <h1 className='text-[30px]'>Add Product</h1>
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
          <Label htmlFor='price'>Price</Label>
          <Input
            type='number'
            id='price'
            placeholder='Type Product Price in EUROs'
            onChange={handleInputChange}
            className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px] text-[#000]'
          />
        </div>
        <div className='flex flex-col gap-[10px] '>
          <Label htmlFor='price'>Add Category</Label>
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
          Add Product
        </Button>
      </form>
    </div>
  );
}

export default AddProductPage;
