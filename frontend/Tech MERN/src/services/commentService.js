import axios from 'axios';

export const addNewComment = async (comment) => {
  try {
    const res = await axios.post('/api/comment', comment);
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

export const getCommentsByProduct = async (commentID) => {
  try {
    const res = await axios.get(`/api/comment/filter/${commentID}`);
    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        comments: res.data.comments,
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

export const getAllComments = async () => {
  try {
    const res = await axios.get('/api/comment');
    if (res.status === 200 && res.data.status === 'success') {
      return {
        status: res.data.status,
        allComments: res.data.allComments,
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

export const changeStatus = async (commentID, status) => {
  try {
    const res = await axios.patch('/api/comment', { commentID, status });
    // console.log(res, 'res iz servisa CHANGE STATUS');
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

export const deleteComment = async (commentID) => {
  try {
    const res = await axios.delete(`/api/comment/${commentID}`);
    // console.log(res, 'res iz servisa DELETE COMMENT');
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
