import axios from 'axios';

export const addProduct = async (product) => {
  try {
    const res = await axios.post('/api/admin/product', product, {
      // OBAVEZNO ZBOG FORM_DATA
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }

    return {
      status: res.data.err.status,
      message: res.data.message,
    };
  } catch (error) {
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};

export const deleteSingleProduct = async ({ productID, productImage }) => {
  try {
    const res = await axios.delete(
      `/api/admin/product/${productID}/${productImage}`
    );
    console.log(res, 'res iz servisa');
    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }

    return {
      status: res.data.err.status,
      message: res.data.message,
    };
  } catch (error) {
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};

export const updatedProduct = async (product) => {
  try {
    const res = await axios.put('/api/admin/product', product);
    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        message: res.data.message,
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
