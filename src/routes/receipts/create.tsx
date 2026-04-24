import ReceiptsCreateForm from "@/src/components/ReceiptsCreateForm.tsx/ReciptsCreateForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/receipts/create")({
  component: ReceiptsCreateForm,
});
