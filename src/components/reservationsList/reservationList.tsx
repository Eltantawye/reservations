import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { format } from "date-fns";
import useReservation from "../../hooks/useReservation";
import { reservationReducerTypes } from "../../types/reservationReducerTypes";
import { Reservation, SortOrder } from "../../types/reservationTypes";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface HeadCell {
  id: string;
  label: string;
}

export const headCells: HeadCell[] = [
  {
    id: "id",
    label: "Guest No.",
  },
  {
    id: "customer",
    label: "Customer",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "shift",
    label: "Shift",
  },
  {
    id: "businessDate",
    label: "Date",
  },
  {
    id: "start",

    label: "From",
  },
  {
    id: "end",

    label: "To",
  },
  {
    id: "quantity",

    label: "Quantity",
  },
  {
    id: "area",

    label: "Area",
  },
  {
    id: "guestNotes",

    label: "Notes",
  },
];

type ReservationsListProps = {
  data: Reservation[];
};
const ReservationsList = ({ data }: ReservationsListProps) => {
  const [order, setOrder] = useState<SortOrder>("asc");
  const [orderBy, setOrderBy] = useState<string | null>();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { state } = useReservation();

  const handleUserFilterClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userFilterOpened = Boolean(anchorEl);
  const popoverId = userFilterOpened ? "user-filter-popover" : undefined;

  const { dispatch } = useReservation();

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Reservation
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as string);
    dispatch({
      type: reservationReducerTypes.sortReservations,
      payload: {
        columnKey: property,
        sortDir: isAsc ? "desc" : "asc",
      },
    });
  };

  const handleUserSearch = (filterOption: string, filterValue: string) => {
    dispatch({
      type: reservationReducerTypes.filterReservations,
      payload: {
        filterOption,
        filterValue,
      },
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="reservations-list">
          <TableHead>
            <TableRow>
              {headCells.map((headCell: HeadCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={(evt) =>
                      handleRequestSort(evt, headCell.id as keyof Reservation)
                    }
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                  {headCell.id === "customer" && (
                    <IconButton
                      aria-describedby={popoverId}
                      color="primary"
                      onClick={handleUserFilterClick}
                    >
                      <FilterAltIcon />
                    </IconButton>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((reservation: Reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>

                <TableCell component="th" scope="row">
                  {`${reservation.customer.firstName} ${reservation.customer.lastName}`}
                </TableCell>
                <TableCell>{reservation.status}</TableCell>

                <TableCell>{reservation.shift}</TableCell>
                <TableCell>{reservation.businessDate}</TableCell>
                <TableCell>
                  {format(new Date(reservation.start), "hh:mm a")}
                </TableCell>
                <TableCell>
                  {format(new Date(reservation.end), "hh:mm a")}
                </TableCell>
                <TableCell>{reservation.quantity}</TableCell>
                <TableCell>{reservation.area}</TableCell>
                <TableCell>{reservation.guestNotes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={popoverId}
        open={userFilterOpened}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack gap={2} sx={{ padding: 2 }}>
          <TextField
            id="reservation-name"
            label="Name"
            variant="outlined"
            placeholder="Search by Name"
            value={state.filterOptions?.firstName ?? ""}
            onChange={(event) =>
              handleUserSearch("firstName", event.target.value)
            }
          />
          <TextField
            id="reservation-sir-name"
            label="Sir Name"
            variant="outlined"
            placeholder="Search by Sir-Name"
            value={state.filterOptions?.lastName ?? ""}
            onChange={(event) =>
              handleUserSearch("lastName", event.target.value)
            }
          />
          <Box>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Stack>
      </Popover>
    </Paper>
  );
};

export default ReservationsList;
