import { useSelector } from 'react-redux';

function AuthorizationPage() {
  const { toggle } = useSelector((state) => state.authorizationStore);

  return (
    <div className='container mx-auto'>
      {toggle ? <div>Register</div> : <div>Login</div>}
    </div>
  );
}

export default AuthorizationPage;
