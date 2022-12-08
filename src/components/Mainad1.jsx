import React from 'react';
import { FcAlarmClock } from 'react-icons/fc';
import { useState } from 'react';
import { useEffect } from 'react';
const Mainad1 = () => {
  const time = ['time', '時間', 'heures', 'tiempo', '시간'];
  let count = 0;
  const [text, setText] = useState('시간');
  const test = () => {
    if (count == 5) {
      count = 0;
    }
    let word = time[count];
    setText(word);
    console.log(time[count]);
    count++;
  };
  useEffect(() => {
    const intervalid = setInterval(test, 2000);
    setTimeout(() => clearInterval(intervalid), 30000);
  }, []);

  return (
    <div className='text-3xl md:text-5xl  flex flex-col justify-center items-center ad1 relative'>
      <video src='video.mp4' muted autoPlay loop className='w-full'></video>
      <div className='ad1-p'>
        <div className='flex text-center mb-2'>
          당신의 <div className='text-indigo-900 w-20 md:w-40'>{text}</div>
          <FcAlarmClock className='ml-2 mr-2' /> 삽니다
        </div>
        <div className='mb-2'>웨이팅 아르바이트 전문 플랫폼</div>
        <div>
          <span className='relative'>
            <div className='dot'>●</div>소
          </span>
          소한 알
          <span className='relative'>
            <div className='dot'>●</div>바
          </span>
          <span className='text-amber-800 ml-4 font-extrabold'>Soba</span>
        </div>
      </div>
    </div>
  );
};

export default Mainad1;
