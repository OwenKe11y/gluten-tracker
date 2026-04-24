import DashboardPage from "@/src/pages/DashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  loader: () => ({
    crumb: "Dashboard",
  }),
});
