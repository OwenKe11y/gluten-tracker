import { Link as RouterLink } from "@tanstack/react-router";
import { Box, Button } from "@mui/material";
import { headerHeight } from "./constants";

const Sidebar = () => (
  <Box
    sx={{
      position: "fixed",
      top: headerHeight,
      height: `calc(100vh - ${headerHeight}px)`,
      backgroundColor: "background.paper",
      borderRight: "1px solid",
      borderColor: "divider",
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      overflowY: "auto",
    }}
  >
    <Button component={RouterLink} to="/dashboard" variant="text">
      Dashboard
    </Button>
    <Button component={RouterLink} to="/receipts" variant="text">
      Receipts
    </Button>
    <Button component={RouterLink} to="/scans" variant="text">
      Scans
    </Button>
  </Box>
);

export default Sidebar;
