import { Navigate } from 'react-router-dom';
import { localStorageConfig } from '../config/localStorageConfig';

function AdminProtect(props) {
  const user = JSON.parse(localStorage.getItem(localStorageConfig.USER));

  return (
    <div>
      {user && user.role === 'admin' ? (
        { ...props.children }
      ) : (
        <Navigate to={'/'} />
      )}
    </div>
  );
}

export default AdminProtect;
