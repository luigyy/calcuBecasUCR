import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";
import { datesBetween } from "../functions/calcularMontos";

interface DateWithAmountProps {
  currentDatesIndex: number;
  reubicaException?: { date: Date };
  fechasDepositos: { alimentacion: Date; gastos: Date };
  dates: { startDate: Date; endDate: Date };
  fechasAlimentacion: { startDate: Date; endDate: Date };
  fechasGastos: { startDate: Date; endDate: Date };
  alimentacionLunesADomingo: boolean;
  reubica: number;
  alimentacion: number;
  gastos: number;
  desglose: boolean;
  calculatorFunc: (
    startDate: Date,
    endDate: Date,
    montos: {
      reubica: number;
      alimentacion: number;
      gastos: number;
    },
    alimentacionLunesADomingo: boolean
  ) => number;
}

const DateWithAmount: React.FC<DateWithAmountProps> = ({
  reubica,
  alimentacion,
  gastos,
  calculatorFunc,
  dates,
  reubicaException,
  desglose,
  fechasAlimentacion,
  fechasGastos,
  fechasDepositos,
  alimentacionLunesADomingo,
  currentDatesIndex,
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
    const depositoAlimentacion = fechasDepositos.alimentacion.getDate();
    const depositoGastos = fechasDepositos.gastos.getDate();
    const formattedDate = (
      <p className="text-gray-300">
        {monthName} (
        <span className={`${desglose ? "text-green-500" : ""}`}>
          {depositoAlimentacion}
        </span>
        ,{" "}
        <span className={`${desglose ? "text-red-500" : ""}`}>
          {" "}
          {depositoGastos}
        </span>
        );
      </p>
    );
    return formattedDate;
  };
  //
  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }
  //
  const [exceptReubic, setExceptReubica] = useState<boolean>(false);
  const [totalAlimentacion, setTotalAlimentacion] = useState<number>(0);
  const [totalGastos, setTotalGastos] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number>(getWindowSize());
  const [total, setTotal] = useState<number>(0);
  const [formattedDate, setFormattedDate] = useState<JSX.Element>(formatDate());
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
      },
      alimentacionLunesADomingo
    );
    return setTotalAlimentacion(tempAlimentacion);
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
      },
      alimentacionLunesADomingo
    );
    setTotalGastos(tempGastos);
  };
  const calculateReubicaException = () => {
    if (
      reubicaException &&
      reubicaException.date.toDateString() === dates.startDate.toDateString()
    ) {
      return setExceptReubica(true);
    }

    setExceptReubica(false);
  };

  //
  const calculateTotal = () => {
    if (exceptReubic) {
      return setTotal(totalAlimentacion + totalGastos);
    }
    return setTotal(totalAlimentacion + totalGastos + reubica);
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
    alimentacionLunesADomingo,
    currentDatesIndex,
    dates,
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

  useEffect(() => {
    setFormattedDate(formatDate());
  }, [desglose, dates]);

  useEffect(() => {
    calculateReubicaException();
  }, [dates]);

  return (
    <div className="mt-5  ">
      <div className="flex items-center justify-around md:flex-col  w-full mx-auto">
        <span
          className="tooltip tooltip-top tooltip-primary font-semibold px-4 py-2  bg-primary rounded-3xl text-center border-primary"
          data-tip={
            "cubre " + datesBetween(dates.startDate, dates.endDate) + " dias"
          }
        >
          {formattedDate}
          {/* {dates.startDate.toLocaleDateString("eu-GB")} */}
        </span>
        <span className="text-4xl my-2 flex justify-center text-center">
          {windowSize! > 768 ? <BsArrowDown /> : <BsArrowRight />}
        </span>
        {desglose ? (
          <div className="flex flex-col items-center">
            <span
              className="text-green-500 tooltip tooltip-right"
              data-tip="alimentacion"
            >
              {totalAlimentacion} ₡
            </span>
            <span
              className="text-red-500 tooltip tooltip-right"
              data-tip="Gastos de carrera"
            >
              {totalGastos} ₡
            </span>
            <span>
              {exceptReubic ? (
                <p className="text-sm text-red-500 italic">Sin reubica</p>
              ) : (
                <p
                  className="text-red-500 tooltip tooltip-right"
                  data-tip="Reubica"
                >
                  {reubica} ₡
                </p>
              )}
            </span>
          </div>
        ) : (
          <span className="p-2 text-center border-primary">
            {/* TODO: clean this */}
            {total.toLocaleString()}₡
          </span>
        )}
      </div>
    </div>
  );
};

export default DateWithAmount;
