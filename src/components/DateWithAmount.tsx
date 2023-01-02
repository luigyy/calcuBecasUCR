import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";

interface DateWithAmountProps {}

const DateWithAmount: React.FC<DateWithAmountProps> = ({}) => {
  //
  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }
  //
  const [windowSize, setWindowSize] = useState<number>();
  //
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //
  return (
    <div className="mt-5  ">
      <div className="flex items-center justify-around md:flex-col  w-full mx-auto">
        <span className=" font-semibold px-4 py-2  bg-primary rounded-3xl text-center border-primary">
          01/01/2023
        </span>
        <span className="text-4xl my-2 flex justify-center text-center">
          {windowSize! > 768 ? <BsArrowDown /> : <BsArrowRight />}
        </span>
        <span className="p-2 text-center border-primary">66.676₡</span>
      </div>
    </div>
  );
};

export default DateWithAmount;
