import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../store/loaderSlice';
import { getAllUsers } from '../../services/adminService';

function UsersPage() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    dispatch(setShowLoader(true));
    const res = await getAllUsers();
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      setUsers(res.users);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='min-h-[100vh] text-[#fff]'>
      {users.map((user, index) => {
        return <div key={index}>{user.username}</div>;
      })}
    </div>
  );
}

export default UsersPage;
