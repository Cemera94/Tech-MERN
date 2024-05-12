import axios from 'axios';

export const getProductsByCategory = async (title) => {
  try {
    const res = await axios.get(`api/category/${title}`);
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
    console.log(error, 'greska iz servisa GET SINGLE PRODUCT');
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};

export const getCategory = async (title) => {
  try {
    const res = await axios.get(`api/category/filter/${title}`);
    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        category: res.data.category,
      };
    }

    return {
      status: res.data.err.status,
      message: 'Something went wrong',
    };
  } catch (error) {
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};
