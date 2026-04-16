import { Container } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import type { FunctionComponent } from "react";
import { contentHeight } from "./constants";

const Content: FunctionComponent = () => {
  return (
    <Container sx={{ marginTop: `${contentHeight}px` }} maxWidth="xl">
      <Outlet />
    </Container>
  );
};

export default Content;
