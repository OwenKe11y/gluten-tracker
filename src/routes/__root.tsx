import { Grid } from "@mui/material";
import { createRootRoute, redirect } from "@tanstack/react-router";
import Content from "../layout/content";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";

const RootLayout = () => (
  <Grid container>
    <Grid size={12}>
      <Header />
    </Grid>
    <Grid size={1}>
      <Sidebar />
    </Grid>
    <Grid size={11}>
      <Content />
    </Grid>
  </Grid>
);

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});
