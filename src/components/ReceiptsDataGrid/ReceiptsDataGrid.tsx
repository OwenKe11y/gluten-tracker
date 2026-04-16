import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { FunctionComponent } from "react";
import { useReceipts } from "../../hooks/useReceipt";
import type { ReceiptItems } from "../../types/receipts";
import { Box } from "@mui/material";
import ReceiptItemsCell from "./ReceiptItemCell";

// Extract into a separate component for better organization

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, align: "left" },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "items",
    headerName: "Items",
    flex: 0.8,
    align: "left",
    headerAlign: "left",
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, ReceiptItems[]>) => (
      <ReceiptItemsCell items={params.value || []} />
    ),
  },
  {
    field: "store",
    headerName: "Store",
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "gluten_total",
    headerName: "Gluten Total",
    type: "number",
    flex: 0.8,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "receipt_total",
    headerName: "Receipt Total",
    type: "number",
    flex: 0.8,
    align: "left",
    headerAlign: "left",
  },
];

const ReceiptsDataGrid: FunctionComponent = () => {
  const { receipts } = useReceipts();

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={receipts}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        disableColumnMenu
      />
    </Box>
  );
};

export default ReceiptsDataGrid;
