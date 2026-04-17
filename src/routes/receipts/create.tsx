import { createFileRoute } from "@tanstack/react-router";
import ReceiptsCreateForm from "../../components/ReceiptsCreateForm.tsx/ReciptsCreateForm";

export const Route = createFileRoute("/receipts/create")({
  component: ReceiptsCreateForm,
});
