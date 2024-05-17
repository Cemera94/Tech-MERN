import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { setShowLoader } from '../store/loaderSlice';
import { updateUser } from '../services/userService';
import { localStorageConfig } from '../config/localStorageConfig';

function ProfilePage() {
  const { user } = useSelector((state) => state.userStore);
  const [data, setData] = useState(() => ({
    username: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postCode: '',
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setData({
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        address: user.address || '',
        city: user.city || '',
        postCode: user.postCode || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.username === '') {
      toast.error('Please enter a username');
      return;
    }

    dispatch(setShowLoader(true));
    const res = await updateUser(data);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      toast.success(res.message);
      let obj = JSON.parse(localStorage.getItem(localStorageConfig.USER));
      Object.assign(obj, data);
      localStorage.setItem(localStorageConfig.USER, JSON.stringify(obj));
    } else toast.error(res.message);
  };

  const handleinputChange = (e) => {
    const newData = { ...data };
    const { id, value } = e.target;
    newData[id] = value;
    setData(newData);
  };

  return (
    <div className='container mx-auto mt-[100px]'>
      <div className='w-[100%] flex flex-col items-center justify-center'>
        <form
          action=''
          className='flex flex-col w-[35%] gap-[20px]'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='flex flex-col gap-[10px] mb-[50px]'>
            <h1 className='text-[30px]'>Edit Your Profile</h1>
            <p className='text-[19px] '>
              <span className='text-[#1a936f] italic'>
                Welcome {user.username}
              </span>{' '}
            </p>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-[20px]'>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  id='email'
                  className='outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                  onChange={handleinputChange}
                  value={user.email}
                />
              </div>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  id='username'
                  className='outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                  onChange={handleinputChange}
                  defaultValue={user.username}
                />
              </div>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  id='firstName'
                  placeholder='First Name'
                  className='outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                  onChange={handleinputChange}
                  defaultValue={user.firstName ? user.firstName : ''}
                />
              </div>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  type='text'
                  id='lastName'
                  placeholder='Last Name'
                  className='outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                  onChange={handleinputChange}
                  defaultValue={user.lastName ? user.lastName : ''}
                />
              </div>
            </div>
            <div className='flex flex-col gap-[20px]'>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  id='address'
                  placeholder='Address'
                  className='outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                  onChange={handleinputChange}
                  defaultValue={user.address ? user.address : ''}
                />
              </div>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='city'>City</label>
                <input
                  type='text'
                  id='city'
                  placeholder='City'
                  className='outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                  onChange={handleinputChange}
                  defaultValue={user.city ? user.city : ''}
                />
              </div>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='postCode'>Post Code</label>
                <input
                  type='text'
                  id='postCode'
                  placeholder='City'
                  className='outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                  onChange={handleinputChange}
                  defaultValue={user.postCode ? user.postCode : ''}
                />
              </div>
            </div>
          </div>

          <Button className='bg-[#1a936f] py-[8px] rounded-[10px] outline-none text-white'>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
