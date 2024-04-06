import axios from 'axios';

export const addProduct = async (product) => {
  try {
    const res = await axios.post('/api/admin/add-product', product, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res, 'res iz ADD PRODUCT');
    return res;
  } catch (error) {
    console.log(error, 'Error adding product');
    return error;
  }
};
