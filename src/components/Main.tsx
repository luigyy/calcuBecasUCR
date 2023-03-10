import React, { useEffect, useState } from "react";
import InputFields from "./InputFields";
import DateWithAmount from "./DateWithAmount";
import { montosSedeCentral } from "../data";
import { calculate4, calculate5 } from "../functions/calcularMontos";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

interface MainProps {}

const depositos = [
  {
    fechasAlimentacion: [
      { startDate: new Date("01/02/2023"), endDate: new Date("01/29/2023") },
      { startDate: new Date("01/30/2023"), endDate: new Date("02/14/2023") },
      { startDate: new Date("02/15/2023"), endDate: new Date("03/04/2023") },
    ],
    fechasGastos: [
      { startDate: new Date("01/02/2023"), endDate: new Date("01/30/2023") },
      { startDate: new Date("01/31/2023"), endDate: new Date("02/15/2023") },
      { startDate: new Date("02/16/2023"), endDate: new Date("03/04/2023") },
    ],
    fechasDepositos: [
      { alimentacion: new Date("01/11/2023"), gastos: new Date("01/12/2023") },
      { alimentacion: new Date("01/30/2023"), gastos: new Date("01/31/2023") },
      { alimentacion: new Date("02/15/2023"), gastos: new Date("02/16/2023") },
    ],
    nombre: "3º ciclo, 2022",
  },
  {
    fechasAlimentacion: [
      { startDate: new Date("03/13/2023"), endDate: new Date("04/12/2023") },
      { startDate: new Date("04/13/2023"), endDate: new Date("05/01/2023") },
      { startDate: new Date("05/02/2023"), endDate: new Date("05/30/2023") },
      { startDate: new Date("06/01/2023"), endDate: new Date("07/15/2023") },
    ],
    fechasGastos: [
      { startDate: new Date("03/13/2023"), endDate: new Date("04/13/2023") },
      { startDate: new Date("04/14/2023"), endDate: new Date("05/02/2023") },
      { startDate: new Date("05/03/2023"), endDate: new Date("06/1/2023") },
      { startDate: new Date("06/02/2023"), endDate: new Date("07/15/2023") },
    ],
    fechasDepositos: [
      { alimentacion: new Date("03/16/2023"), gastos: new Date("03/17/2023") },
      { alimentacion: new Date("04/13/2023"), gastos: new Date("04/14/2023") },
      { alimentacion: new Date("05/02/2023"), gastos: new Date("05/03/2023") },
      { alimentacion: new Date("06/01/2023"), gastos: new Date("06/02/2023") },
    ],
    nombre: "1º ciclo, 2023",
  },
];
const Main: React.FC<MainProps> = ({}) => {
  //states
  const [currentDatesIndex, setCurrentDatesIndex] = useState<number>(0);
  const [calculatorFunc, setCalculatorFunc] = useState<
    (
      startDate: Date,
      endDate: Date,
      montos: { reubica: number; alimentacion: number; gastos: number },
      alimentacionLunesADomingo: boolean
    ) => number
  >(() => calculate5);

  const [beca, setBeca] = useState<"4" | "5">("5");
  const [gastos, setGastos] = useState<number>(montosSedeCentral.gastos);
  const [alimentacion, setAlimentacion] = useState<number>(
    montosSedeCentral.alimentacion
  );
  const [reubica, setReubica] = useState<number>(montosSedeCentral.reubica);
  const [dates, setDates] = useState(depositos[currentDatesIndex]); //ciclo
  const [desglose, setDesglose] = useState<boolean>(false);
  const [alimentacionLunesADomingo, setAlimentacionLunesADomingo] =
    useState<boolean>(true);

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

  const handleNextCicle = () => {
    const lastIndex = depositos.length;
    setCurrentDatesIndex((prevState) =>
      prevState + 1 === lastIndex ? prevState : prevState + 1
    );
  };
  const handlePreviousCicle = () => {
    setCurrentDatesIndex((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };
  //
  useEffect(() => {
    if (beca === "4") {
      setCalculatorFunc(() => calculate4);
    } else {
      setCalculatorFunc(() => calculate5);
    }
  }, [beca]);
  //
  //im sure theres a cleanest way to do this
  useEffect(() => {
    if (beca === "4") {
      setAlimentacionLunesADomingo(false);
    }
    if (beca === "5") {
      //@ts-ignore
      setAlimentacionLunesADomingo((prev) =>
        prev === false ? !prev : alimentacionLunesADomingo
      );
    }
  }, [beca]);
  useEffect(() => {
    if (beca === "4") {
      setAlimentacionLunesADomingo(false);
    }
  }, [alimentacionLunesADomingo]);

  useEffect(() => {
    setDates(depositos[currentDatesIndex]);
  }, [currentDatesIndex]);
  //handlers
  return (
    <div className="mt-10">
      <h1 className="mt-5 text-center font-semibold text-xl">
        Sede Rodrigo Facio
      </h1>
      <div className=" flex justify-center my-5 text-center items-center font-semibold gap-5 ">
        <button
          className="text-2xl rounded-2xl hover:bg-gray-200 p-3 tooltip tooltip-left"
          data-tip="Ciclo anterior"
          onClick={handlePreviousCicle}
        >
          {" "}
          <FaLongArrowAltLeft />{" "}
        </button>
        {dates.nombre}
        <button
          className="text-2xl rounded-2xl hover:bg-gray-200 p-3 tooltip tooltip-right"
          data-tip="Siguiente ciclo"
          onClick={handleNextCicle}
        >
          <FaLongArrowAltRight />
        </button>
      </div>
      <p className="text-[10px] text-center italic ">
        *calculos para becas 4 y 5 son hechos incluyendo reubicacion geografica
      </p>
      <p className="mb-2 md:mb-0 text-[10px] text-center italic ">
        *calculos hechos tomando en cuenta el aumento temporal
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
          <button onClick={() => handleBeca("5")} className=" btn btn-primary">
            Beca 5
          </button>
          <p className="text-center text-[12px] italic text-red-500">
            {beca === "5" ? "Selected" : ""}
          </p>
        </div>
      </div>
      {/* data container  */}
      <div></div>
      <div className="flex justify-center md:justify-around md:flex-nowrap flex-wrap md:w-[80%] w-full m-10 mb-20 md:mb-10 mx-auto">
        <InputFields
          inputFor="Gastos de C."
          inputValue={gastos}
          inputHandler={handleGastos}
        />

        <InputFields
          inputFor="Reubica"
          inputValue={reubica}
          inputHandler={handleReubica}
        />
        <div>
          <InputFields
            inputFor="Alimentación"
            inputValue={alimentacion}
            inputHandler={handleAlimentacion}
          />
          <div
            className=" tooltip tooltip-bottom mt-2 flex flex-col justify-center "
            data-tip="Aplica para alimentación"
          >
            <p className="text-center text-sm italic ">
              {alimentacionLunesADomingo ? "L-D" : "L-V"}
            </p>
            <input
              checked={alimentacionLunesADomingo}
              onChange={() =>
                setAlimentacionLunesADomingo(!alimentacionLunesADomingo)
              }
              type="checkbox"
              className="toggle toggle-info toggle-sm mx-auto mt-1 "
            />
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className="flex flex-col justify-center">
          <p className="text-center my-2">Mostrar desglose</p>
          <input
            onChange={() => setDesglose(!desglose)}
            checked={desglose}
            type="checkbox"
            className="toggle toggle-primary mx-auto text-center "
          />
        </div>
      </div>
      {/* dates container  */}
      <div className="my-7 md:flex md:justify-around w-full md:w-[90%] md:max-w-[800px] mx-auto py-5 px-10 ">
        {dates.fechasAlimentacion.map((item, index) => (
          <DateWithAmount
            currentDatesIndex={currentDatesIndex}
            alimentacionLunesADomingo={alimentacionLunesADomingo}
            desglose={desglose}
            fechasDepositos={dates.fechasDepositos[index]}
            fechasAlimentacion={item}
            fechasGastos={dates.fechasGastos[index]}
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
