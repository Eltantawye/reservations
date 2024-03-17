import "./App.css";
import Main from "./pages/main";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { CountProvider } from "./contexts/reservationsContext";

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "bold",
        },
      },
    },
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CountProvider>
          <Main />
        </CountProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
