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
      {/* data container  */}
      <div></div>
      <div className="flex justify-center md:justify-around md:flex-nowrap flex-wrap md:w-[80%] w-full m-10 mx-auto">
        <InputFields inputFor="Alimentación" />
        <InputFields inputFor="Reubica" />
        <InputFields inputFor="Gastos de C." />
      </div>
      {/* dates container  */}
      <div className="mt-10 md:flex md:justify-around   w-full md:w-[90%] md:max-w-[700px] mx-auto py-5 px-10 ">
        <DateWithAmount />
        <DateWithAmount />
        <DateWithAmount />
      </div>
      {/* dates container  */}
      {/* data container  */}
    </div>
  );
};

export default Main;
