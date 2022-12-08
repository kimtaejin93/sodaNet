import React from 'react';
import { MdOutlineRamenDining } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { searchPlace } from '../features/placeSlice';
import { login, logout, onUserStateChange } from '../api/firebase';
import { useEffect } from 'react';

const Navbar = () => {
  const [inputText, setInputText] = useState('');
  const [loginUser, setLoginUser] = useState();
  useEffect(() => {
    onUserStateChange((user) => setLoginUser(user));
  }, []);
  console.log(loginUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    login().then((data) => setLoginUser(data));
  };
  const handleLogout = () => {
    logout().then(setLoginUser);
  };

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText == '') {
      window.alert('입력된 값이 없습니다.');
      return;
    }
    dispatch(searchPlace(inputText));

    setInputText('');
    navigate('/search');
  };

  return (
    <div className='flex justify-between items-center mx-15per mt-5 border-b border-gray-300 pb-2'>
      <div>
        <Link to='/' className='flex items-center'>
          <MdOutlineRamenDining className='text-4xl text-amber-900' />
          <div className='font-semibold '>Soba</div>
        </Link>
      </div>
      <nav>
        <Link to='/' className='hover:text-gray-600'>
          홈
        </Link>
        <Link to='/board' className='ml-5 hover:text-gray-600'>
          소바 찾기
        </Link>
      </nav>
      <form className='flex items-center' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='가게를 검색해보세요'
          onChange={onChange}
          value={inputText}
        />
        <button>
          <FiSearch className='text-amber-900 hover:text-amber-700' />
        </button>
      </form>
      {loginUser ? (
        <div className='flex items-center'>
          <img src={loginUser.photoURL} className='w-8 rounded-full' />
          <div>{loginUser.displayName}</div>
        </div>
      ) : (
        ''
      )}
      {!!loginUser ? (
        <button
          className=' px-2 font-semibold hover:text-gray-600'
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className=' px-2 font-semibold hover:text-gray-600'
          onClick={handleLogin}
        >
          Login
        </button>
      )}
      {}
    </div>
  );
};

export default Navbar;
