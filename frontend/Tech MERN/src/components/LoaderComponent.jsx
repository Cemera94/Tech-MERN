import { useSelector } from 'react-redux';

function LoaderComponent() {
  const { showLoader } = useSelector((state) => state.loaderStore);

  return (
    <>
      {showLoader ? (
        <div className='loader-wrapper'>
          <div className='loader'></div>
        </div>
      ) : null}
    </>
  );
}

export default LoaderComponent;
