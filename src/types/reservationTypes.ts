export type Reservation = {
  id: number;
  customer: {
    firstName: string;
    lastName: string;
  };
  shift: string;
  businessDate: string;
  start: string;
  end: string;
  status: string;
  quantity: number;
  area: string;
  guestNotes?: string;
};

export type SortOrder = "asc" | "desc";
