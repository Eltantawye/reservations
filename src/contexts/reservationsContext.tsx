import * as React from "react";
import mockData from "../utils/mockData";
import {
  Action,
  Dispatch,
  ReservationProviderProps,
  State,
  reservationReducerTypes,
} from "../types/reservationReducerTypes";
import {
  filterReservations,
  getUpcomingReservations,
  sortReservations,
} from "../utils/reservationsUtils";

const RESERVATIONS_MOCK_DATA = mockData.reservations;
const UPCOMING_RESERVATIONS_MOCK = getUpcomingReservations(
  RESERVATIONS_MOCK_DATA
);

export const ReservationStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const reservationReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case reservationReducerTypes.filterReservations: {
      const filterOptions = {
        ...state.filterOptions,
        [action.payload.filterOption]: action.payload.filterValue,
      };
      return {
        ...state,
        reservations: filterReservations(
          filterOptions.businessDate
            ? RESERVATIONS_MOCK_DATA
            : UPCOMING_RESERVATIONS_MOCK,
          filterOptions
        ),
        filterOptions,
      };
    }
    case reservationReducerTypes.sortReservations: {
      return {
        ...state,
        reservations: sortReservations(
          state.reservations,
          action.payload.sortDir,
          action.payload.columnKey
        ),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function CountProvider({ children }: ReservationProviderProps) {
  const [state, dispatch] = React.useReducer(reservationReducer, {
    reservations: UPCOMING_RESERVATIONS_MOCK,
  });

  const value = { state, dispatch };
  return (
    <ReservationStateContext.Provider value={value}>
      {children}
    </ReservationStateContext.Provider>
  );
}

export { CountProvider };
