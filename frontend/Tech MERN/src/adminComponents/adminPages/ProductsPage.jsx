import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoader } from '../../store/loaderSlice';
import { getAllProducts } from '../../services/productService';
import ConvertPriceHook from '../../utils/convertPrice';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';
import { NavLink } from 'react-router-dom';

function ProductsPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditModal, setisEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const convertPrice = ConvertPriceHook();

  async function fetchData() {
    dispatch(setShowLoader(true));
    const res = await getAllProducts();

    dispatch(setShowLoader(false));
    if (res.status === 'success') {
      setProducts(res.products);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = (product) => {
    setIsDeleteModal(true);
    setCurrentProduct(product);
  };

  const editProduct = (product) => {
    setisEditModal(true);
    setCurrentProduct(product);
  };

  return (
    <div className='min-h-[100vh]'>
      <div className='flex px-[30px] uppercase font-bold text-[20px] bg-[#114b5f] text-[#fff] py-[10px]'>
        <h3 className='w-[10%]'>No</h3>
        <h3 className='w-[20%]'>Image</h3>
        <h3 className='w-[25%]'>Title</h3>
        <h3 className='w-[20%]'>Price</h3>
        <h3 className='w-[25%] text-center'>Actions</h3>
      </div>
      <div className='flex flex-col gap-[5px]'>
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className='flex justify-between items-center product-label bg-[#fff] px-[10px] text-[20px]'
            >
              <div className='w-[10%]'>
                <h3>{index + 1}</h3>
              </div>
              <div className='w-[20%]'>
                <NavLink to={`/product/${product._id}`}>
                  <img
                    src={`https://backendtech-mern.onrender.com/uploads/${product.image}`}
                    alt={product.title}
                    className='w-[100px] h-[100px] object-contain'
                  />
                </NavLink>
              </div>
              <div className='w-[25%]'>
                <h1>{product.title}</h1>
              </div>
              <div className='w-[20%]'>
                <p>{convertPrice(product.price)}</p>
              </div>
              <div className=' flex w-[25%] justify-center gap-[50px]'>
                <button
                  className='bg-[#114b5f] text-[#fff] px-[24px] py-[8px] rounded-[10px]'
                  onClick={() => editProduct(product)}
                >
                  Edit
                </button>
                <button
                  className='bg-red-500 text-[#fff] px-[24px] py-[8px] rounded-[10px]'
                  onClick={() => deleteProduct(product)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {isDeleteModal && (
        <DeleteModal
          currentProduct={currentProduct}
          setIsDeleteModal={setIsDeleteModal}
          isDeleteModal={isDeleteModal}
          fetchData={fetchData}
        />
      )}
      {isEditModal && (
        <EditModal
          currentProduct={currentProduct}
          setisEditModal={setisEditModal}
          isEditModal={isEditModal}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default ProductsPage;
