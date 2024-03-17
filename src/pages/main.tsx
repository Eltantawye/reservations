import { Divider, Grid, useTheme } from "@mui/material";
import Header from "../components/header/header";
import SideFilter from "../components/reservationsFilter/reservationsFilter";
import ReservationsList from "../components/reservationsList/reservationList";
import useReservation from "../hooks/useReservation";

const Main = () => {
  const theme = useTheme();
  const {
    state: { reservations },
  } = useReservation();

  return (
    <Grid container gap={4}>
      <Grid item xs={12}>
        <Header headerTitle="Reservations" />
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          px: 20,
          [theme.breakpoints.down("md")]: {
            px: 2,
          },
        }}
      >
        <Grid item xs={12}>
          <SideFilter />
          <Divider sx={{ mt: 2 }} />
        </Grid>
        <Grid item xs={12}>
          {/* <RestaurantListContainer data={reservations} /> */}
          <ReservationsList data={reservations} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
