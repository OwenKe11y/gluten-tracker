import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";
import type { FunctionComponent } from "react";
import { useReceiptsContext } from "../contexts/ReceiptsContext";

const ScansPage: FunctionComponent = () => {
  const { receipts, receiptsLoading } = useReceiptsContext();

  const getFileNameFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <Grid container spacing={3}>
      {receiptsLoading
        ? Array.from(new Array(8)).map((_, index) => (
            <Grid size={3} key={index}>
              <Card sx={{ maxWidth: 345, margin: "auto", height: "100%" }}>
                <Skeleton variant="rectangular" height={525} />
                <CardContent>
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))
        : receipts.map((receipt, index) => {
            const fileName = getFileNameFromUrl(receipt.image_link);
            return (
              <Grid size={3} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    margin: "auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="iframe"
                    src={receipt.image_link}
                    title={fileName}
                    sx={{
                      height: 525,
                      border: "none",
                      flexShrink: 0,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {fileName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
    </Grid>
  );
};

export default ScansPage;
