import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginInfo } from '../features/authoritySlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userInfo, setUserInfo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    if (userInfo == '') {
      window.alert('아이디를 입력하세요');
      return;
    } else dispatch(loginInfo(userInfo));
    navigate('/');
    setUserInfo('');
  };
  return (
    <div className='h-screen flex justify-center items-center '>
      <form
        onSubmit={login}
        className='mb-24 flex flex-col border rounded-lg border-amber-500 p-10'
      >
        <input
          type='text'
          placeholder='아이디'
          className='mb-4 w-60 border-b border-gray-600'
          onChange={(e) => {
            setUserInfo(e.target.value);
          }}
        />

        <input
          type='password'
          placeholder='비밀번호'
          className='mb-4 w-60 border-b border-gray-600'
        />
        <button className='bg-amber-300 rounded-full'>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
