import { type FunctionComponent } from "react";

import { Box } from "@mui/material";
import ReceiptsDataGrid from "../components/ReceiptsDataGrid";

const ReceiptsPage: FunctionComponent = () => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <ReceiptsDataGrid />
    </Box>
  );
};

export default ReceiptsPage;
