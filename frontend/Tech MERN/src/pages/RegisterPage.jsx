import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';

import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { checkEmailValidation } from '../utils/checkEmailValidation';
import { register } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoader } from '../store/loaderSlice';
import { toast } from 'react-toastify';
import { showLoginForm } from '../store/authorizationSlice';
import { NavLink } from 'react-router-dom';

function RegisterPage() {
  const [passwordView, setPasswordView] = useState(false);
  // VALIDACIJA FORME
  const [isEmail, setIsEmail] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isUsername, setisUsername] = useState(true);

  // PODACI O USERU
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
  });

  // dispatch
  const dispatch = useDispatch();

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
    !data.username ? setisUsername(false) : setisUsername(true);
    !checkEmailValidation(data.email)
      ? setIsEmailValid(false)
      : setIsEmailValid(true);

    if (
      !data.email ||
      !data.password ||
      !data.username ||
      !checkEmailValidation(data.email)
    )
      return;

    // LOGIKA ZA SLANJE NA BEKEND
    dispatch(setShowLoader(true));
    const res = await register(data);
    dispatch(setShowLoader(false));

    if (res.status === 'success') {
      toast.success(res.message);
      dispatch(showLoginForm());
    } else {
      toast.error(res.message);
    }
    console.log(res, 'res sa fronta');
  };

  return (
    <div className='container mx-auto'>
      <div className='w-[100%] flex flex-col items-center justify-center'>
        <form
          action=''
          className='flex flex-col w-[50%] gap-[20px]'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='flex flex-col gap-[10px] mb-[50px]'>
            <h1 className='text-[30px]'>TechMERN Shop Registration</h1>
            <p className='text-[19px] '>
              <span className='text-blue-700 italic'>Quick and Simple</span>{' '}
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
          <div className='flex flex-col gap-[10px]'>
            <Label htmlFor='username'>
              {isUsername ? (
                'Username'
              ) : (
                <span className='text-red-500'>Username is required</span>
              )}
            </Label>
            <Input
              type='text'
              id='username'
              placeholder='Choose your username'
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
          <Button className='bg-blue-700 py-[8px] rounded-[10px] outline-none text-white'>
            Register
          </Button>
        </form>
        <span className='mt-[30px] text-slate-500'>
          Already have an account?
          <span
            onClick={() => dispatch(showLoginForm())}
            className='text-blue-700 cursor-pointer ml-[10px] underline'
          >
            Login here
          </span>
        </span>
      </div>
    </div>
  );
}

export default RegisterPage;
