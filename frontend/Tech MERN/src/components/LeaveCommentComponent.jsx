import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewComment,
  getCommentsByProduct,
} from '../services/commentService';
import { setShowLoader } from '../store/loaderSlice';
import { toast } from 'react-toastify';
import formatDate from '../utils/formatDate';

function LeaveCommentComponent({ product }) {
  const dispatch = useDispatch();
  const [isComment, setIsComment] = useState(true);
  const [count, setCount] = useState(0);
  const { user } = useSelector((state) => state.userStore);
  const [comment, setComment] = useState({
    comment: '',
  });
  const [commentsByProduct, setCommentsByProduct] = useState([]);

  const handleSingleComment = (e) => {
    setComment({ ...comment, comment: e.target.value });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.comment === '') {
      setIsComment(false);
    } else setIsComment(true);

    dispatch(setShowLoader(true));
    const res = await addNewComment(comment);
    dispatch(setShowLoader(false));

    console.log(res, 'res sa fronta LEAVE COMMENT');
    if (res.status === 'success') {
      toast.success(res.message);
      setComment((prev) => ({
        ...prev,
        comment: '',
      }));
    } else toast.error(res.message);
  };

  useEffect(() => {
    if (product._id && product.title && user.username) {
      setComment((prev) => ({
        ...prev,
        author: user.username,
        product_id: product._id,
        product_title: product.title,
      }));
    }
  }, [user, product]);

  const fetchComments = async () => {
    dispatch(setShowLoader(true));
    const res = await getCommentsByProduct(product._id);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setCommentsByProduct(res.comments.filter((comment) => comment.status));
    }
  };

  useEffect(() => {
    if (product && product._id) {
      fetchComments();
    }
  }, [product, product._id]);

  return (
    <div className='mb-[50px]'>
      <div className='text-[24px] mb-[30px]'>
        Comments({commentsByProduct.length})
      </div>
      <form className='mb-[100px]'>
        <div className='flex flex-col w-[50%] gap-[20px] mb-[30px]'>
          <label htmlFor='comment'>
            {isComment ? (
              'Your Comment Here'
            ) : (
              <span className='text-red-500'>Comment is required</span>
            )}
          </label>
          <textarea
            name='comment'
            id='comment'
            maxLength={200}
            onChange={(e) => handleSingleComment(e)}
            value={comment.comment}
          ></textarea>
        </div>
        <button
          className='bg-[#1a936f] py-[8px] px-[24px] rounded-[10px] outline-none text-white'
          onClick={(e) => handleSubmitComment(e)}
        >
          Submit Comment
        </button>
      </form>
      {commentsByProduct.length > 0 &&
        commentsByProduct.map((comment, index) => {
          return (
            <div
              key={index}
              className='comment w-[50%] flex flex-col gap-[30px] mb-[50px]'
            >
              <div className='flex justify-between text-[20px] text-slate-500'>
                <h3>{comment.author}</h3>
                <h3>{formatDate(comment.date)}</h3>
              </div>
              <div className='mb-[20px]'>
                <h3 className='text-[20px]'>{comment.comment}</h3>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default LeaveCommentComponent;
