import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const res = await axios.get('/api/product');
    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        products: res.data.products,
      };
    }
    return {
      status: res.data.err.status,
      message: 'Something went wrong',
    };
  } catch (error) {
    console.log(error, 'greska iz servisa GET ALL PRODUCTS');
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};

export const getSingleProduct = async (id) => {
  try {
    const res = await axios.get(`/api/product/single-product/${id}`);
    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        product: res.data.product,
      };
    }

    return {
      status: res.data.err.status,
      message: 'Something went wrong',
    };
  } catch (error) {
    console.log(error, 'greska iz servisa GET SINGLE PRODUCT');
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};
