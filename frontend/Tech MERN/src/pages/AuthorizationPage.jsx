import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function AuthorizationPage() {
  const { toggle } = useSelector((state) => state.authorizationStore);

  return (
    <div className='container mx-auto'>
      {toggle ? <RegisterPage /> : <LoginPage />}
    </div>
  );
}

export default AuthorizationPage;
