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
    <div className='min-h-[100vh] text-[#fff] flex flex-wrap gap-[80px] py-[50px]'>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <div className='flex flex-col gap-[10px] bg-[#fff] rounded-[10px] text-[#000] p-[20px] min-w-[300px] font-bold text-[17px]'>
              <div>No: {index + 1}</div>
              <div>Username: {user.username}</div>
              <div>Email: {user.email}</div>
              <div>Role: {user.role}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UsersPage;
