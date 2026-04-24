import dayjs from "dayjs";
import type { ReceiptFormState } from "../components/ReceiptsCreateForm.tsx/types";

export const headerHeight = 64;
export const contentHeight = headerHeight + 24;

export const INITIAL_FORM_STATE: ReceiptFormState = {
    date: dayjs(),
    items: [{ name: "", amount: 1 }],
    store: "",
    location: "",
    gluten_total: "",
    receipt_total: "",
};
