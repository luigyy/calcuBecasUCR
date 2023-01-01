import React from "react";
import { BsArrowDown } from "react-icons/bs";

interface DateWithAmountProps {}

const DateWithAmount: React.FC<DateWithAmountProps> = ({}) => {
  return (
    <div>
      <div className="flex flex-col max-w-[100px] ">
        <span className="font-semibold p-2 text-center border-primary">
          01/01/2023
        </span>
        <span className="text-2xl flex justify-center text-center">
          <BsArrowDown />
        </span>
        <span className="p-2 text-center border-primary">66.676₡</span>
      </div>
    </div>
  );
};

export default DateWithAmount;
