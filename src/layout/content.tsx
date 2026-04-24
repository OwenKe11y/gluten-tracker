import { contentHeight } from "@/src/types/constants";
import { Container, Grid, Typography } from "@mui/material";
import { Outlet, useLocation } from "@tanstack/react-router";
import type { FunctionComponent } from "react";

const getRouteName = (pathname: string): string => {
  const name = pathname.split("/").filter(Boolean)[0] || "Dashboard";
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const Content: FunctionComponent = () => {
  const location = useLocation();
  const routeName = getRouteName(location.pathname);
  return (
    <Container sx={{ marginTop: `${contentHeight}px` }} maxWidth="xl">
      <Grid container spacing={3} size={12}>
        <Grid size={6}>
          <Typography variant="h3">{routeName}</Typography>
        </Grid>
        <Grid size={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
