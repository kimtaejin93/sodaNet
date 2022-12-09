import React from 'react';
import { readBoard } from '../api/firebase';
import { useState } from 'react';
import { useEffect } from 'react';

const Board = () => {
  const [post, setPost] = useState();
  useEffect(() => {
    readBoard(setPost);
  }, []);
  console.log(post);

  return (
    <div className='mt-10 '>
      <table className='rwd-table'>
        <thead>
          <tr>
            <th>가게</th>
            <th>위치</th>
            <th>닉네임</th>
            <th>제안 금액</th>
          </tr>
        </thead>
        <tbody>
          {post &&
            post.map((data) => (
              <tr key={data.item.uuid} className='font-semibold cursor-pointer'>
                <td data-th='가게'>{data.item.select.place_name}</td>
                <td data-th='위치'>{data.item.select.road_address_name}</td>
                <td data-th='닉네임'>{data.item.username}</td>
                <td data-th='제안 금액' className='text-right'>
                  {data.item.offer}원
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
