import { createFileRoute } from "@tanstack/react-router";
import ReceiptsPage from "../pages/ReceiptsPage";

export const Route = createFileRoute("/receipts")({
  component: ReceiptsPage,
  loader: () => ({
    crumb: "Receipts",
  }),
});
