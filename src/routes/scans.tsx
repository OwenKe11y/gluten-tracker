import { createFileRoute } from "@tanstack/react-router";
import ScansPage from "../pages/ScansPage";

export const Route = createFileRoute("/scans")({
  component: ScansPage,
  loader: () => ({
    crumb: "Scans",
  }),
});
