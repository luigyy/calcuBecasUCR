import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";
import { datesBetween } from "../functions/calcularMontos";

interface DateWithAmountProps {
  reubicaException?: { date: Date };
  // dates2: {
  //   fechasAlimentacion: [{ startDate: Date; endDate: Date }];
  //   fechasGastos: [{ startDate: Date; endDate: Date }];
  // };
  dates: { startDate: Date; endDate: Date };
  fechasAlimentacion: { startDate: Date; endDate: Date };
  fechasGastos: { startDate: Date; endDate: Date };
  reubica: number;
  alimentacion: number;
  gastos: number;
  calculatorFunc: (
    startDate: Date,
    endDate: Date,
    montos: {
      reubica: number;
      alimentacion: number;
      gastos: number;
    }
  ) => number;
}

const DateWithAmount: React.FC<DateWithAmountProps> = ({
  reubica,
  alimentacion,
  gastos,
  calculatorFunc,
  dates,
  reubicaException,
  fechasAlimentacion,
  fechasGastos,
}) => {
  const formatDate = () => {
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const monthName = monthNames[dates.startDate.getMonth()];
    const date = dates.startDate.getDate();
    const formattedDate = monthName + ", " + date.toString();
    return formattedDate;
  };
  //
  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }
  //
  const [totalAlimentacion, setTotalAlimentacion] = useState<number>(0);
  const [totalGastos, setTotalGastos] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number>(getWindowSize());
  const [total, setTotal] = useState<number>(0);
  //
  const calculateAlimentacion = () => {
    //calculate totalAlimentacion
    const tempAlimentacion = calculatorFunc(
      fechasAlimentacion.startDate,
      fechasAlimentacion.endDate,
      {
        reubica: 0,
        alimentacion,
        gastos: 0,
      }
    );
    setTotalAlimentacion(tempAlimentacion);
  };
  //
  const calculateGastos = () => {
    //calculate totalGastos
    const tempGastos = calculatorFunc(
      fechasGastos.startDate,
      fechasGastos.endDate,
      {
        reubica: 0,
        alimentacion: 0,
        gastos,
      }
    );
    setTotalGastos(tempGastos);
  };
  //
  const calculateTotal = () => {
    var tempReubica = reubica;
    if (
      reubicaException &&
      reubicaException.date.toDateString() === dates.startDate.toDateString()
    ) {
      tempReubica = 0;
    }
    setTotal(totalAlimentacion + totalGastos + tempReubica);
  };
  //
  useEffect(() => {
    calculateAlimentacion();
    calculateGastos();
    calculateTotal();
  }, [
    reubica,
    alimentacion,
    gastos,
    calculatorFunc,
    totalAlimentacion,
    totalGastos,
  ]);
  //
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
        <span
          className="tooltip tooltip-top tooltip-primary font-semibold px-4 py-2  bg-primary rounded-3xl text-center border-primary"
          data-tip={
            "cubre " + datesBetween(dates.startDate, dates.endDate) + " dias"
          }
        >
          {formatDate()}
          {/* {dates.startDate.toLocaleDateString("eu-GB")} */}
        </span>
        <span className="text-4xl my-2 flex justify-center text-center">
          {windowSize! > 768 ? <BsArrowDown /> : <BsArrowRight />}
        </span>
        <span className="p-2 text-center border-primary">
          {/* TODO: clean this */}
          {total.toLocaleString()}₡
        </span>
      </div>
    </div>
  );
};

export default DateWithAmount;
