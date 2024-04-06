import { useDispatch, useSelector } from 'react-redux';
import { showRegisterForm } from '../store/authorizationSlice';
import Label from '../components/Label';
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { checkEmailValidation } from '../utils/checkEmailValidation';
import { setShowLoader } from '../store/loaderSlice';
import { toast } from 'react-toastify';
import { localStorageConfig } from '../config/localStorageConfig';
import { setUser } from '../store/userSlice';
import { login } from '../services/userService';

function LoginPage() {
  const [isEmail, setIsEmail] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [passwordView, setPasswordView] = useState(false);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newData = { ...data };
    const { id, value } = e.target;
    newData[id] = value;
    setData(newData);
  };

  const handlePasswordView = () => {
    setPasswordView(!passwordView);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    !data.email ? setIsEmail(false) : setIsEmail(true);
    !data.password ? setIsPassword(false) : setIsPassword(true);
    !checkEmailValidation(data.email)
      ? setIsEmailValid(false)
      : setIsEmailValid(true);

    if (!data.email || !data.password || !checkEmailValidation(data.email))
      return;

    // LOGIKA ZA SLANJE NA BEKEND
    dispatch(setShowLoader(true));
    const res = await login(data);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      localStorage.setItem(localStorageConfig.USER, JSON.stringify(res.user));
      dispatch(setUser(res.user));
      navigate('/');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className='login-form-wrapper container mx-auto'>
        <div className='w-[100%] flex flex-col items-center justify-center'>
          <form
            className='login-form flex flex-col w-[50%] gap-[20px]'
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className='flex flex-col gap-[10px] mb-[50px]'>
              <h1 className='text-[30px]'>Welcome Back</h1>
              <p className='text-[19px] '>
                <span className='text-[#114b5f] italic'>
                  Please login to start exploring
                </span>{' '}
              </p>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <Label htmlFor='email'>
                {isEmail ? (
                  isEmailValid ? (
                    'Email'
                  ) : (
                    <span className='text-red-500'>Email is not valid</span>
                  )
                ) : (
                  <span className='text-red-500'>Email is required</span>
                )}
              </Label>
              <Input
                type='text'
                id='email'
                placeholder='example@gmail.com'
                className='outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                onChange={handleInputChange}
              />
            </div>
            <div className='relative flex flex-col gap-[10px]'>
              <Label htmlFor='password'>
                {isPassword ? (
                  'Password'
                ) : (
                  <span className='text-red-500'>Password is required</span>
                )}
              </Label>
              <Input
                type={passwordView ? 'text' : 'password'}
                id='password'
                placeholder='Type your password'
                className='relative outline-none border border-slate-300 rounded-[10px] px-[16px] py-[8px]'
                onChange={handleInputChange}
              />
              <div
                className='absolute top-[40px] right-[16px] cursor-pointer'
                onClick={() => handlePasswordView()}
              >
                {passwordView ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Button className='bg-[#114b5f] py-[8px] rounded-[10px] outline-none text-white'>
              Login
            </Button>
          </form>
          <span className='mt-[30px] text-slate-500'>
            Don't have an account?
            <span
              onClick={() => dispatch(showRegisterForm())}
              className='text-[#114b5f] cursor-pointer ml-[10px] underline'
            >
              Register here
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
