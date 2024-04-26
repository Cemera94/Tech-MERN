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

export const login = async (user) => {
  try {
    const res = await axios.post('/api/user/login', user);
    console.log(res, 'res iz servisa LOGIN');

    // res koji se prikazuje u konzoli, pristupamo res.status i res.data.status
    if (res.status === 200 && res.data.status === 'success') {
      return {
        // status i message koji šaljemo na front(Login.jsx) i tamo pristupamo preko konstante res=login(data) koja će imati ova dva propertija
        status: res.data.status,
        user: res.data.user,
        token: res.data.token,
      };
    }
    return {
      status: res.data.err.status,
      message: res.data.message,
    };

    /* return {
      status: res.data.err.status,
      message: res.data.message,
    }; */
  } catch (error) {
    console.log(error, 'greška iz servisa LOGIN');
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};
