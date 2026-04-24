import DashboardIcon from "@mui/icons-material/Dashboard";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

import { headerHeight } from "@/src/types/constants";
import LinkIcon from "@mui/icons-material/Link";
const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "inherit",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: "inherit",
          boxSizing: "border-box",
          position: "fixed", // Fix the drawer position
          top: headerHeight, // Position it right below the header
          height: `calc(100vh - ${headerHeight}px)`, // Adjust height to account for header
          zIndex: 1200, // Ensure it stays above other content
        },
      }}
    >
      <Box sx={{ overflow: "auto", height: "100%" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/receipts">
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Receipts" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/scans">
              <ListItemIcon>
                <DocumentScannerIcon />
              </ListItemIcon>
              <ListItemText primary="Scans" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="https://www.revenue.ie/en/home.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Revenue" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
