import React from "react";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div>
      <div className="navbar w-[95%] flex md:px-20 justify-between bg-base-100 m-2 shadow mx-auto">
        {/* logo */}
        <div>
          <span className="-tracking-wider font-semibold normal-case md:text-3xl text-xl">
            calcuBecas<span className="text-primary">UCR</span>
          </span>
        </div>
        {/* logo */}
        <div className="flex gap-5">
          <h1
            className="tooltip tooltip-bottom text-2xl"
            data-tip="luigy.valverde@ucr.ac.cr"
          >
            {<AiOutlineMail />}
          </h1>
          <a
            href="https://github.com/luigyy/calcuBecasUCR"
            target="_blank"
            className="tooltip tooltip-bottom hover:shadow-2xl  text-2xl"
            data-tip="Colabora"
          >
            {<BsGithub />}
          </a>
          <a
            href="https://www.instagram.com/luigyyyyyy/"
            target="_blank"
            className="text-2xl tooltip tooltip-bottom"
            data-tip="Mi contacto"
          >
            {<BsInstagram />}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
