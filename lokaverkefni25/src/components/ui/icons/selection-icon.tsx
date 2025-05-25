import React from 'react';

type SelectionIconProps = {
  isSelected:boolean
}

const SelectionIcon = ({isSelected}: SelectionIconProps) => {
  return (
    isSelected ?   <div className='flex flex-row space-x-1'>
      <svg
      width="25"
      height="25"
      viewBox="0 0 1024 1024"
      fill="green"
      className="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#b0b0b0"
        >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="14.336000000000002"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M439.2 680c9.6 8.8 25.6 8.8 35.2-0.8l300-309.6C784 360 784 344 773.6 334.4c-9.6-9.6-25.6-9.6-35.2 0.8L438.4 644.8l35.2-0.8-182.4-167.2c-10.4-9.6-25.6-8.8-35.2 1.6-9.6 10.4-8.8 25.6 1.6 35.2L439.2 680z"
          fill=""
        />
        <path
          d="M515.2 1007.2c-276 0-500-224-500-500S239.2 7.2 515.2 7.2s500 224 500 500-224 500-500 500z m0-952C265.6 55.2 63.2 257.6 63.2 507.2s202.4 452 452 452 452-202.4 452-452S764.8 55.2 515.2 55.2z"
          fill=""
        />
      </g>
        </svg><span className="bg-button-delete text-white  px-4 rounded-sm">Remove</span>
    </div>
   : 
    <div className="flex flex-row space-x-1">
      <svg
      width="25"
      height="25"
      viewBox="0 0 1024 1024"
      fill="#b0b0b0"
      className="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#b0b0b0"
        >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="14.336000000000002"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M439.2 680c9.6 8.8 25.6 8.8 35.2-0.8l300-309.6C784 360 784 344 773.6 334.4c-9.6-9.6-25.6-9.6-35.2 0.8L438.4 644.8l35.2-0.8-182.4-167.2c-10.4-9.6-25.6-8.8-35.2 1.6-9.6 10.4-8.8 25.6 1.6 35.2L439.2 680z"
          fill=""
        />
        <path
          d="M515.2 1007.2c-276 0-500-224-500-500S239.2 7.2 515.2 7.2s500 224 500 500-224 500-500 500z m0-952C265.6 55.2 63.2 257.6 63.2 507.2s202.4 452 452 452 452-202.4 452-452S764.8 55.2 515.2 55.2z"
          fill=""
        />
      </g>
        </svg>
        <span className="bg-button-primary text-white  px-4 rounded-sm">Order</span>
    </div>
  );
};

export default SelectionIcon;