import { Container } from "@mui/material";
import type { FunctionComponent } from "react";
import { contentHeight } from "./constants";
import { Outlet } from "@tanstack/react-router";

const Content: FunctionComponent = () => {
  return (
    <Container sx={{ marginTop: `${contentHeight}px` }} maxWidth="xl">
      <Outlet />
    </Container>
  );
};

export default Content;
