import React from "react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div>
      <div className="navbar w-[95%] flex justify-center bg-base-100 m-2 shadow">
        <span className="-tracking-wider font-semibold normal-case md:text-3xl text-xl">
          calcuBecas<span className="text-primary">UCR</span>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
