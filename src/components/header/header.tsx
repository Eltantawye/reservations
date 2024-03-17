import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

type HeaderProps = {
  headerTitle: string;
};
const Header = ({ headerTitle }: HeaderProps) => {
  return (
    <AppBar component="nav" position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {headerTitle}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
