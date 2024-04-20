import React from 'react';

const Modal = ({room,users,darkMode}) => {
  return (
    <div className="fixed  top-16 md:hidden inset-0 z-[1] !mt-0  py-10 overflow-x-hidden bg-white bg-opacity-5 backdrop-blur-lg">
<div className="flex flex-col gap-y-3 justify-center items-center  mx-auto ">
            <h2 className="font-normal text-[22px] bg-[#eae4f6] rounded-lg text-richblack-900 p-[24px]">ROOM NO- {room}</h2>
            <h3 className={`font-[500px] text-[18px] mb-[4px] ${darkMode ? 'text-white' : ' text-black'}`} style={{ padding: '12px 24px 0 24px' }}>Users</h3>
            <ul className="users">
            {users.map((user, index) => (
            <li key={index}  className={`${darkMode ? 'text-pink-200' : ' text-pink-200'} ml-2`}>
              {user.username}
              <span className="hello"></span>
            </li>
          ))}
        </ul>
        </div>

    </div>
  );
};

export default Modal;