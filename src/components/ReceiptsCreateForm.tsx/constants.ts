import dayjs from "dayjs";
import type { ReceiptFormState } from "./types";

export const INITIAL_FORM_STATE: ReceiptFormState = {
  date: dayjs(),
  items: [{ name: "", amount: 1 }],
  store: "",
  location: "",
  gluten_total: "",
  receipt_total: "",
};
