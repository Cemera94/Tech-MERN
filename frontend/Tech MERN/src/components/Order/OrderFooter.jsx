import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../store/orderSlice';

function OrderFooter({ onClick, disabled }) {
  const { currentStep } = useSelector((state) => state.orderStore);
  const dispatch = useDispatch();

  return (
    <>
      {currentStep === 1 && (
        <div className='w-[100%] flex justify-end mt-[50px]'>
          <button
            className='mr-[10px] px-[24px] py-[12px] bg-[#1a936f] text-[#fff] rounded-[6px]'
            onClick={() => dispatch(setCurrentStep(1))}
          >
            Proceed To Payment
          </button>
        </div>
      )}
      {currentStep === 2 && (
        <div className='w-[100%] flex justify-between mt-[50px]'>
          <button
            className='mr-[10px] px-[24px] py-[12px] bg-red-500 text-[#fff] rounded-[6px]'
            onClick={() => dispatch(setCurrentStep(-1))}
          >
            Back
          </button>
          <button
            className='mr-[10px] px-[24px] py-[12px] bg-[#1a936f] text-[#fff] rounded-[6px]'
            onClick={onClick}
            disabled={disabled}
          >
            Submit Payment
          </button>
        </div>
      )}
    </>
  );
}

export default OrderFooter;
