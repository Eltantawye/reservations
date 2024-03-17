import { Box, Stack } from "@mui/material";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import CustomSelect from "../reusable/customSelect";
import useReservation from "../../hooks/useReservation";
import { format, isValid, parse } from "date-fns";
import { RESERVATION_DATE_FORMAT } from "../../constants/reservationConstants";
import { reservationReducerTypes } from "../../types/reservationReducerTypes";

const RESERVATION_STATUSES = [
  "Confirmed",
  "Seated",
  "Checked out",
  "Not confirmed",
];

const SHIFTS = ["breakfast", "lunch", "dinner"];

const AREAS = ["MAIN ROOM", "BAR"];

const SideFilter = () => {
  const {
    state: { filterOptions },
    dispatch,
  } = useReservation();

  const handleChangeDate = (
    date: string | Date | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    if (!context.validationError) {
      const formattedDate = format(
        new Date(date as string),
        RESERVATION_DATE_FORMAT
      );
      dispatch({
        type: reservationReducerTypes.filterReservations,
        payload: {
          filterOption: "businessDate",
          filterValue: date ? formattedDate : undefined,
        },
      });
    }
  };

  const handleDateClear = () => {
    dispatch({
      type: reservationReducerTypes.filterReservations,
      payload: { filterOption: "businessDate", filterValue: undefined },
    });
  };

  const handleFilterOnSelect = (option: string, value: string) => {
    dispatch({
      type: reservationReducerTypes.filterReservations,
      payload: { filterOption: option, filterValue: value },
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box>
          <DatePicker
            label="Data"
            onChange={handleChangeDate}
            slotProps={{
              field: { clearable: true, onClear: () => handleDateClear() },
            }}
          />
        </Box>
        <Box>
          <CustomSelect
            id="status-label"
            label="Status"
            value={filterOptions?.status || ""}
            onSelect={(status) => handleFilterOnSelect("status", status)}
            values={RESERVATION_STATUSES}
          />
        </Box>
        <Box>
          <CustomSelect
            id="shift-label"
            label="Shift"
            value={filterOptions?.shift || ""}
            onSelect={(shift) => handleFilterOnSelect("shift", shift)}
            values={SHIFTS}
          />
        </Box>
        <Box>
          <CustomSelect
            id="area-label"
            label="Area"
            value={filterOptions?.area || ""}
            onSelect={(area) => handleFilterOnSelect("area", area)}
            values={AREAS}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default SideFilter;
