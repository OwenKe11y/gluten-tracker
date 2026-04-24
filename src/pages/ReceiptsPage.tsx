import { type FunctionComponent } from "react";

import ReceiptsDataGrid from "@/src/components/ReceiptsDataGrid/ReceiptsDataGrid";
import { Grid } from "@mui/material";

const ReceiptsPage: FunctionComponent = () => {
  return (
    <Grid container spacing={3}>
      <ReceiptsDataGrid />
    </Grid>
  );
};

export default ReceiptsPage;
