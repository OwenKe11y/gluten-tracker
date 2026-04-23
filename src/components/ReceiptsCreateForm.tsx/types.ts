import type { Dayjs } from "dayjs";
import type { ReceiptItems } from "../../types/receipts";

export interface ReceiptFormState {
  date: Dayjs;
  items: ReceiptItems[];
  store: string;
  location: string;
  gluten_total: number | "";
  receipt_total: number | "";
}
