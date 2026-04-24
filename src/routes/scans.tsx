import ScansPage from "@/src/pages/ScansPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scans")({
  component: ScansPage,
  loader: () => ({
    crumb: "Scans",
  }),
});
