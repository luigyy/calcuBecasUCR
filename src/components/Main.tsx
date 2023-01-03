import React, { useEffect, useState } from "react";
import InputFields from "./InputFields";
import DateWithAmount from "./DateWithAmount";
import { montosSedeCentral } from "../data";
import { calculate4, calculate5 } from "../functions/calcularMontos";

interface MainProps {}

const depositos = {
  verano22: [
    { startDate: new Date("01/11/2023"), endDate: new Date("01/30/2023") },
    { startDate: new Date("01/30/2023"), endDate: new Date("02/15/2023") },
    { startDate: new Date("02/15/2023"), endDate: new Date("02/30/2023") },
  ],
};
const Main: React.FC<MainProps> = ({}) => {
  //states
  const [calculatorFunc, setCalculatorFunc] = useState<
    (
      startDate: Date,
      endDate: Date,
      montos: { reubica: number; alimentacion: number; gastos: number }
    ) => number
  >(() => calculate5);

  const [beca, setBeca] = useState<"4" | "5">("5");
  const [gastos, setGastos] = useState<number>(montosSedeCentral.gastos);
  const [alimentacion, setAlimentacion] = useState<number>(
    montosSedeCentral.alimentacion
  );
  const [reubica, setReubica] = useState<number>(montosSedeCentral.reubica);
  const [dates, setDates] = useState(depositos.verano22);

  //states
  //handlers
  const handleBeca = (beca: "4" | "5") => {
    setBeca(beca);
  };
  const handleGastos = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setGastos(parseInt(e.target.value));
  };
  const handleAlimentacion = (e: React.FormEvent<HTMLInputElement>) => {
    //@ts-ignore
    setAlimentacion(parseInt(e.target.value));
  };
  const handleReubica = (e: React.FormEvent<HTMLInputElement>) => {
    //@ts-ignore
    setReubica(parseInt(e.target.value));
  };

  useEffect(() => {
    if (beca === "4") {
      setCalculatorFunc(() => calculate4);
    } else {
      setCalculatorFunc(() => calculate5);
    }
  }, [beca]);

  //handlers
  return (
    <div className="mt-10">
      <h1 className="mt-5 text-center font-semibold text-lg">
        Sede Rodrigo Facio
      </h1>
      <h1 className="mt-5 text-center font-semibold">3º ciclo, 2022</h1>
      <p className="text-[10px] text-center italic mb-3">
        calculos para becas 4 y 5 son hechos incluyendo reubicacion geografica
      </p>
      <div className="flex justify-around ">
        <div>
          <button onClick={() => handleBeca("4")} className="btn btn-primary">
            Beca 4
          </button>
          <p className="text-center text-[12px] italic text-red-500">
            {beca === "4" ? "Selected" : ""}
          </p>
        </div>

        <div>
          <button onClick={() => handleBeca("5")} className="btn btn-primary">
            Beca 5
          </button>
          <p className="text-center text-[12px] italic text-red-500">
            {beca === "5" ? "Selected" : ""}
          </p>
        </div>
      </div>
      {/* data container  */}
      <div></div>
      <div className="flex justify-center md:justify-around md:flex-nowrap flex-wrap md:w-[80%] w-full m-10 mx-auto">
        <InputFields
          inputFor="Alimentación"
          inputValue={alimentacion}
          inputHandler={handleAlimentacion}
        />
        <InputFields
          inputFor="Reubica"
          inputValue={reubica}
          inputHandler={handleReubica}
        />
        <InputFields
          inputFor="Gastos de C."
          inputValue={gastos}
          inputHandler={handleGastos}
        />
      </div>
      {/* dates container  */}
      <div className="mt-10 md:flex md:justify-around   w-full md:w-[90%] md:max-w-[700px] mx-auto py-5 px-10 ">
        {dates.map((item, index) => (
          <DateWithAmount
            key={index}
            dates={item}
            calculatorFunc={calculatorFunc}
            reubica={reubica}
            gastos={gastos}
            alimentacion={alimentacion}
            reubicaException={{ date: new Date("02/15/2023") }}
          />
        ))}
      </div>
      {/* dates container  */}
      {/* data container  */}
    </div>
  );
};

export default Main;
