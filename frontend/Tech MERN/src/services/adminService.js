import axios from 'axios';

export const addProduct = async (product) => {
  try {
    const res = await axios.post('/api/admin/add-product', product, {
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
