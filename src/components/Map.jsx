import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { FiMapPin } from 'react-icons/fi';
import { choicePlace } from '../features/placeSlice';
import { useNavigate } from 'react-router';
const { kakao } = window;
const Map = () => {
  const searchedPlace = useSelector((state) => state.place.searchedPlace);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const choice = (data) => {
    dispatch(choicePlace(data));
    navigate('/choice');
  };

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.57648141, 127.00136665),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchedPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        setSearchData(data);
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
  }, [searchedPlace]);

  console.log(searchData);
  return (
    <div className='mt-10 flex flex-col items-center justify-center md:flex md:flex-row w-full'>
      <div id='myMap' className='w-4/5 md:w-2/5 square md:mr-6'></div>
      <div className='md:w-2/5 overflow-auto square relative w-full scroll'>
        <div className='md:absolute w-full flex flex-col justify-center items-center mt-5 md:mt-0'>
          {searchData.length > 0
            ? searchData.map((data) => (
                <div
                  key={data.id}
                  className='mb-3  p-2  md:mr-6 w-4/5 border-gray-300 border-b hover:border-gray-600 relative search-place cursor-pointer'
                  onClick={(e) => choice(data)}
                >
                  <div className='absolute right-0 cent border border-orange-300 text-xs pl-4 pr-4 rounded-lg place'>
                    <div>Search </div>
                    <div>SOBA</div>
                  </div>
                  <div>{data.place_name}</div>
                  <div className='flex '>
                    <FiMapPin />
                    {data.road_address_name}
                  </div>
                </div>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default Map;
