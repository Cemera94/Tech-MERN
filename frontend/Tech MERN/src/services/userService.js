import axios from 'axios';

export const register = async (user) => {
  try {
    const res = await axios.post('/api/user/register', user);
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
    console.log(error, 'greška iz servisa');
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};
