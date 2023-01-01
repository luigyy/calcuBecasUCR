import React from "react";
import InputFields from "./InputFields";
import DateWithAmount from "./DateWithAmount";

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  return (
    <div className="mt-10">
      <h1 className="mt-5 text-center font-semibold">3º ciclo, 2022</h1>
      <p className="text-[10px] text-center italic mb-3">
        calculos para becas 4 y 5 son hechos incluyendo reubicacion geografica
      </p>
      <div className="flex justify-around ">
        <button className="btn btn-primary">Beca 4</button>
        <button className="btn btn-primary">Beca 5</button>
      </div>
      {/* dates container  */}
      <div className="flex justify-around flex-wrap w-[90%] max-w-[650px] m-10 mx-auto">
        <InputFields />
        <InputFields />
        <InputFields />
      </div>
      <div className="mt-10 flex justify-between  w-[90%] md:max-w-[700px] mx-auto py-5 px-10 ">
        <DateWithAmount />
        <DateWithAmount />
        <DateWithAmount />
        <DateWithAmount />
      </div>
      {/* dates container  */}
    </div>
  );
};

export default Main;
