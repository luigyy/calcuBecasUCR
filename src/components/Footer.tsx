import React from "react";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="mt-52">
      <footer className="footer items-center p-4 bg-neutral text-neutral-content">
        <div className="items-center w-full md:flex ">
          <p className="text-center mx-auto md:m-0 font-semibold ">
            If it was helpful, give the repo a star at{" "}
          </p>
          <a
            href="https://github.com/luigyy"
            target="_blank"
            className="mx-auto md:m-0 text-3xl"
          >
            <BsGithub />
          </a>
        </div>
        <div className="grid-flow-col md:m-0 mx-auto gap-4 md:place-self-center md:justify-self-end">
          <a
            className="text-2xl text-blue-500 bg-white rounded-full"
            href="https://www.facebook.com/profile.php?id=100089069324175"
            target="_blank"
          >
            <BsFacebook />
          </a>
          <a
            className="text-2xl"
            href="https://www.instagram.com/luigyyyyyy/"
            target="_blank"
          >
            <BsInstagram />
          </a>
          <a
            className="text-2xl"
            href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=luigy.valverde@gmail.com`}
            target="_blank"
          >
            <MdEmail />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
