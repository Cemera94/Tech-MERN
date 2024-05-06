import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../store/loaderSlice';
import { deleteComment, getAllComments } from '../../services/commentService';
import formatDate from '../../utils/formatDate';
import { changeStatus } from '../../services/commentService';
import { toast } from 'react-toastify';

function CommentsPage() {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);

  const handleStatus = async (el) => {
    const newStatus = !el.status;
    dispatch(setShowLoader(true));
    const res = await changeStatus(el._id, newStatus);
    dispatch(setShowLoader(false));
    console.log(res, 'res sa fronta CHANGE STATUS');
    if (res.status === 'success') {
      toast.success(res.message);
      /* setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === el._id ? { ...comment, status: newStatus } : comment
        )
      ); */
      fetchData();
    } else toast.error(res.message);
  };

  const fetchData = async () => {
    dispatch(setShowLoader(true));
    const res = await getAllComments();
    dispatch(setShowLoader(false));
    console.log(res, 'res sa fronta GET ALL COMMENTS');
    if (res.status === 'success') {
      setComments(res.allComments);
    }
  };
  const handleDelete = async (elementID) => {
    dispatch(setShowLoader(true));
    const res = await deleteComment(elementID);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      toast.success(res.message);
      fetchData();
    } else toast.error(res.message);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='min-h-[100vh]'>
      <table className='table-auto w-full border-separate border-spacing-y-1'>
        <thead>
          <tr className='text-left font-bold text-[20px] bg-[#114b5f] text-[#fff] py-[10px]'>
            <th>No</th>
            <th>Product</th>
            <th>Author</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((el, index) => {
            return (
              <tr key={index} className='text-left bg-[#fff] h-[50px]'>
                <td className='text-center'>{index + 1}</td>
                <td className='font-bold'>{el.product_title}</td>
                <td>{el.author}</td>
                <td>{el.comment}</td>
                <td>{formatDate(el.date)}</td>
                <td>
                  {!el.status ? (
                    <button
                      className='bg-[#1a936f] text-[#fff] px-[24px] py-[8px] rounded-[10px]'
                      onClick={() => handleStatus(el)}
                    >
                      Allow
                    </button>
                  ) : (
                    <button
                      className='bg-[#ffcc00] text-[#fff] px-[24px] py-[8px] rounded-[10px]'
                      onClick={() => handleStatus(el)}
                    >
                      Forbid
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className='bg-red-500 text-[#fff] px-[24px] py-[8px] rounded-[10px]'
                    onClick={() => handleDelete(el._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CommentsPage;
