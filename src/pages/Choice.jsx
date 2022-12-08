import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BiPhone, BiMapAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { onUserStateChange } from '../api/firebase';

const { kakao } = window;
const Choice = () => {
  const [offerPrice, setOfferPrice] = useState(0);
  const [loginUser, setLoginUser] = useState();
  const choicePlace = useSelector((state) => state.place.choicePlace);
  const userAuthority = useSelector((state) => state.authority.authority);
  const navigate = useNavigate();
  useEffect(() => {
    onUserStateChange(setLoginUser);
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(choicePlace.y, choicePlace.x),
      level: 2,
    };

    const map = new kakao.maps.Map(container, options);

    let markerPosition = new kakao.maps.LatLng(choicePlace.y, choicePlace.x);

    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [choicePlace]);

  const apply = (e) => {
    e.preventDefault();

    if (loginUser) {
      window.alert('신청이 완료되었습니다.');
    } else window.alert('로그인이 필요합니다.');
  };
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center'>
      <div id='map' className='w-72 h-72 md:w-96 md:h-96'></div>

      <div className='w-72 h-72 md:w-96 md:h-96 p-5 flex flex-col'>
        <div className=' text-2xl font-semibold mb-5 text-center'>
          {choicePlace.place_name}
        </div>
        <div className='flex items-center'>
          <BiMapAlt className='mr-3' />
          {choicePlace.road_address_name}
        </div>
        <div className='flex items-center'>
          <BiPhone className='mr-3' />
          {choicePlace.phone}
        </div>
        <div className='flex items-end justify-center flex-1'>
          <form onSubmit={(e) => apply(e)}>
            <input
              type='number'
              placeholder='신청금액'
              className='border-b-gray-600 border'
              onChange={(e) => setOfferPrice(e.target.value)}
            />
            <button className='border-gray-600 mb-5 pl-3 pr-3 rounded-md border hover:border-gray-400 hover:text-gray-600'>
              신청하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Choice;
