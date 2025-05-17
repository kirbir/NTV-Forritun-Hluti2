const HamburgerIcon = () => {
    return (
      <div className="w-6 group cursor-pointer">
        <div className="w-8 h-1 my-2 bg-amber-50 group-hover:bg-amber-400 delay-75 rounded-3xl"></div>
        <div className="w-8 h-1 my-2 bg-amber-50 group-hover:bg-orange-500 delay-150 rounded-3xl"></div>
        <div className="w-8 h-1 my-2 bg-amber-50 group-hover:bg-sky-300 delay-300 rounded-3xl"></div>
      </div>
    );
  };
  
  export default HamburgerIcon;
  