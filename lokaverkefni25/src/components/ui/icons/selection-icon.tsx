

type SelectionIconProps = {
  isSelected: boolean;
};

const SelectionIcon = ({ isSelected }: SelectionIconProps) => {
  return isSelected ? (
    <div className="flex flex-row md:text-center items-center justify-center">
      <svg
      className="ml-1"
        width="25px"
        height="25px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M16 9L10 15M10.0002 9L16.0002 15M8 18L2 12L8 6C8 6 10 5.5 13.5 5.5C19.1685 5.5 20.5 5.5 20.5 12C20.5 18.5 19.2925 18.5 13.5 18.5C10 18.5 8 18 8 18Z"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
      <span className=" text-white text-sm text-center font-bold px-1 ">Remove drink</span>
    </div>
  ) : (
    <div className="flex flex-row justify-evenly space-x-1">
      <svg
        width="25px"
        height="25px"
        viewBox="-2.4 -2.4 28.80 28.80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke=""
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="2.112"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M8 12H16"
            stroke="#70b52c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            d="M12 16V8"
            stroke="#70b52c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
            stroke="#70b52c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
      <span className="text-sm text-white text-center font-bold  px-1 ">Add drink</span>
    </div>
  );
};

export default SelectionIcon;
