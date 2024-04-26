import axios from 'axios';

export const makePayment = async (paymentInfo) => {
  try {
    const res = await axios.post('/api/payment', paymentInfo);

    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        message: res.data.message,
        secretKey: res.data.secretKey,
      };
    }
  } catch (error) {
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};
