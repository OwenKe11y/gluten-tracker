import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { FunctionComponent } from "react";
import { useReceipts } from "../hooks/useReceipt";
import type { ReceiptItems } from "../types/receipts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, align: "left" },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    align: "left",
    headerAlign: "left",
    editable: true,
  },

  {
    field: "items",
    headerName: "Items",
    type: "number",
    flex: 1,
    align: "left",
    headerAlign: "left",
    editable: true,
    // valueGetter: (params) => params.row.item.amount,
  },
  {
    field: "store",
    headerName: "Store",
    type: "string",
    flex: 1,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "location",
    headerName: "Location",
    type: "string",
    flex: 1,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "gluten_total",
    headerName: "Gluten Total",
    type: "number",
    flex: 1,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "receipt_total",
    headerName: "Receipt Total",
    type: "number",
    flex: 1,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
];
const ReceiptsDataGrid: FunctionComponent = () => {
  const { receipts } = useReceipts();
  return (
    <DataGrid
      columns={columns}
      rows={receipts}
      pageSizeOptions={[10]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
    />
  );
};

export default ReceiptsDataGrid;
