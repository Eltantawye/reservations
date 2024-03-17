import { Reservation, SortOrder } from "./reservationTypes";

export enum reservationReducerTypes {
  filterReservations = "filterReservations",
  sortReservations = "sortReservations",
}

export enum filterOptions {
  businessDate = "businessDate",
  status = "status",
  area = "area",
  shift = "shift",
  firstName = "firstName",
  lastName = "lastName",
}

export type Action =
  | { type: keyof typeof reservationReducerTypes; payload: any }
  | {
      type: "filterOptions";
      payload: { filterOption: keyof filterOptions; filterValue: string };
    }
  | {
      type: "sortReservations";
      payload: { sortDir: SortOrder; columnKey: string };
    };
export type Dispatch = (action: Action) => void;
export type State = {
  reservations: Reservation[];
  filterOptions?: { [key in filterOptions]?: string };
};
export type ReservationProviderProps = { children: React.ReactNode };
