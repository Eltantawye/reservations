import { parse } from "date-fns";
import { Reservation } from "../types/reservationTypes";
import { RESERVATION_DATE_FORMAT } from "../constants/reservationConstants";

const DATE_COLUMNS = ["businessDate", "start", "end"];

/**
 *
 * @param reservations list of Reservations
 * @param sortDir sort direction asc or desc
 * @param columnKey column to be sorted
 * @returns sorted Reservations list
 */
export const sortReservations = (
  reservations: Reservation[],
  sortDir: "asc" | "desc",
  columnKey: string
) => {
  if (!reservations?.length) {
    return [];
  }
  return reservations.sort((valueA, valueB) => {
    let result: number;
    if (DATE_COLUMNS.includes(columnKey)) {
      const timestampA = valueA[columnKey as keyof Reservation] as string;
      const timestampB = valueB[columnKey as keyof Reservation] as string;

      const parsedValueA =
        columnKey === "businessDate"
          ? parse(timestampA, RESERVATION_DATE_FORMAT, new Date())
          : new Date(timestampA);
      const parsedValueB =
        columnKey === "businessDate"
          ? parse(timestampB, RESERVATION_DATE_FORMAT, new Date())
          : new Date(timestampB);

      result =
        parsedValueA < parsedValueB ? 1 : parsedValueA > parsedValueB ? -1 : 0;
    } else if (columnKey === "customer") {
      let columnA = valueA.customer.firstName;
      let columnB = valueB.customer.firstName;
      result = columnA < columnB ? 1 : columnA > columnB ? -1 : 0;
    } else {
      let columnA = valueA[columnKey as keyof Reservation] as string;
      let columnB = valueB[columnKey as keyof Reservation] as string;
      result = columnA < columnB ? 1 : columnA > columnB ? -1 : 0;
    }

    return sortDir === "asc" ? result : -1 * result;
  });
};

/**
 *
 * @param reservations list of Reservations
 * @param filterOptions object contains all filters to be applied to the list
 * @returns filtered list
 */

export const filterReservations = (
  reservations: Reservation[],
  filterOptions: { [filterKey: string]: string }
): Reservation[] => {
  const filterdReservations = reservations.filter(
    (reservation: Reservation) => {
      const appliedFilters = Object.entries(filterOptions).every(
        ([key, value]) => {
          if (value) {
            if (key === "firstName" || key === "lastName") {
              return reservation.customer[key].toLowerCase().includes(value);
            }
            return reservation[key as keyof Reservation] === value;
          }
          return reservation;
        }
      );

      return appliedFilters;
    }
  );
  return filterdReservations;
};

export const getUpcomingReservations = (reservations: Reservation[]) => {
  const currentDate = new Date();
  return reservations.filter(
    (reservation) =>
      parse(reservation.businessDate, RESERVATION_DATE_FORMAT, new Date()) >=
      currentDate
  );
};
