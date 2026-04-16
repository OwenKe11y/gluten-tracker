export type ReceiptItems = {
  name: string;
  amount: number;
};

export interface Receipts {
  id: string;
  date: string;
  items: ReceiptItems[];
  store: string;
  location: string;
  gluten_total: number;
  receipt_total: number;
}
