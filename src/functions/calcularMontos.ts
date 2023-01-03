/**
 
 * @param startDate 
 * @param endDate  
 * @param bussinessDays
 *
 * @returns number of dates between date1 and date2,if @param bussinessDays is set to true, calculates the number of bussiness days
 */
export const datesBetween = (
  startDate: Date,
  endDate: Date,
  bussinessDays?: { bussinessDays: boolean }
): number => {
  if (!bussinessDays) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    //@ts-ignore
    const differenceMs = Math.abs(startDate - endDate);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }
  // Validate input
  if (endDate < startDate) return 0;

  // Calculate days between dates
  var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
  startDate.setHours(0, 0, 0, 1); // Start just after midnight
  endDate.setHours(0, 0, 0, 1); // End just before midnight //change this
  //@ts-ignore
  var diff = endDate - startDate; // Milliseconds between datetime objects
  var days = Math.ceil(diff / millisecondsPerDay);

  // Subtract two weekend days for every week in between
  var weeks = Math.floor(days / 7);
  days = days - weeks * 2;

  // Handle special cases
  var startDay = startDate.getDay();
  var endDay = endDate.getDay();

  // Remove weekend not previously removed.
  if (startDay - endDay > 1) days = days - 2;

  // Remove start day if span starts on Sunday but ends before Saturday
  if (startDay == 0 && endDay != 6) {
    days = days - 1;
  }

  // Remove end day if span ends on Saturday but starts after Sunday
  if (endDay == 6 && startDay != 0) {
    days = days - 1;
  }

  return days;
};

/**
 *
 * @param startDate day of deposit
 * @param endDate next day of deposit
 * @param reubica amout per day
 * @param alimentacion amount per day
 * @param gastos amount per day
 */
export const calculate5 = (
  startDate: Date,
  endDate: Date,
  montos: {
    reubica: number;
    alimentacion: number;
    gastos: number;
  },
  alimentacionLunesADomingo: boolean
): number => {
  //check if alimentacio l/v
  if (alimentacionLunesADomingo) {
    const daysToCover = datesBetween(startDate, endDate);
    const amountPerDay = montos.alimentacion + montos.gastos;
    return daysToCover * amountPerDay + montos.reubica;
  }
  const daysToCoverForAlimentacion = datesBetween(startDate, endDate, {
    bussinessDays: true,
  });
  const totalAlimentacion = daysToCoverForAlimentacion * montos.alimentacion;
  const daysToCoverForGastos = datesBetween(startDate, endDate);
  const totalGastos = daysToCoverForGastos * montos.gastos;
  return totalAlimentacion + totalGastos + montos.reubica;
};

/**
 *
 * @param startDate day of deposit
 * @param endDate next day of deposit
 * @param reubica amout per day
 * @param alimentacion amount per day
 * @param gastos amount per day
 */
export const calculate4 = (
  startDate: Date,
  endDate: Date,
  montos: {
    reubica: number;
    alimentacion: number;
    gastos: number;
  }
): number => {
  const daysToCover = datesBetween(startDate, endDate, { bussinessDays: true });
  const amountPerDay = montos.alimentacion; // + montos.gastos; //al parecer beca4 no incluye gastos
  return daysToCover * amountPerDay + montos.reubica;
};
