import { useContext, useEffect } from "react";
import { ReservationStateContext } from "../contexts/reservationsContext";

const useReservation = () => {
  const context = useContext(ReservationStateContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

export default useReservation;
