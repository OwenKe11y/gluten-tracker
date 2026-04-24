import ReceiptsPage from "@/src/pages/ReceiptsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/receipts/")({
  component: ReceiptsPage,
  loader: () => ({
    crumb: "Receipts",
  }),
});
