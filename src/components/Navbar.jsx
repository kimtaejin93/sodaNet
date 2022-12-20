import React from 'react';
import { MdOutlineRamenDining } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux/';
import { searchPlace } from '../features/placeSlice';
import { login, logout, onUserStateChange } from '../api/firebase';
import { useEffect } from 'react';

const Navbar = () => {
  const [inputText, setInputText] = useState('');
  const [loginUser, setLoginUser] = useState();
  const [buttonState, setButtonState] = useState('inactive');
  useEffect(() => {
    onUserStateChange((user) => setLoginUser(user));
  }, []);

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

  const ClickedBurger = () => {
    buttonState == 'active'
      ? setButtonState('inactive')
      : setButtonState('active');
  };

  return (
    <div>
      <div className='flex justify-between items-center mx-15per mt-5 border-b border-gray-300 pb-2'>
        <div>
          <Link to='/' className='flex items-center'>
            <MdOutlineRamenDining className='text-4xl text-amber-900' />
            <div className='font-semibold '>Soba</div>
          </Link>
        </div>

        <div className='lg:hidden'>
          <GiHamburgerMenu onClick={ClickedBurger} />
        </div>
        <div className='hidden lg:flex flex-1 justify-around'>
          <nav>
            <Link to='/' className='hover:text-gray-600 font-bold'>
              홈
            </Link>
            <Link to='/board' className='ml-5 hover:text-gray-600 font-bold'>
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
              <div className='font-bold ml-4'>{loginUser.displayName}</div>
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
        </div>
      </div>
      {/* lg 이하일경우 */}
      {buttonState == 'active' ? (
        <div className='lg:hidden absolute w-3/4 top-11 right-2/4 translate-x-1/2 z-50 bg-slate-300 '>
          <nav className='flex flex-1 flex-col items-center justify-center'>
            <Link to='/' className='hover:text-gray-600 font-bold'>
              홈
            </Link>
            <Link to='/board' className='hover:text-gray-600 font-bold'>
              소바 찾기
            </Link>
          </nav>
          <form
            className='flex items-center justify-center'
            onSubmit={handleSubmit}
          >
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
            <div className='flex flex-col items-center justify-center'>
              <img src={loginUser.photoURL} className='w-8 rounded-full' />
              <div className='font-bold'>{loginUser.displayName}</div>
            </div>
          ) : (
            ''
          )}
          {!!loginUser ? (
            <div className='flex justify-center'>
              <button
                className=' px-2 font-semibold hover:text-gray-600'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='flex justify-center'>
              <button
                className=' px-2 font-semibold hover:text-gray-600'
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Navbar;
