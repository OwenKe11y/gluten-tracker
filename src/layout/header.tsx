import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { headerHeight } from "./constants";

const StyledAppBar = styled(AppBar)({
  top: 0,
  zIndex: 1100,
});

const Header = () => (
  <StyledAppBar sx={{ height: headerHeight }}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Gluten Tracker
      </Typography>
    </Toolbar>
  </StyledAppBar>
);

export default Header;
