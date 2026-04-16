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
  {
    field: "image_link",
    headerName: "Scan Link",
    type: "string",
    flex: 0.8,
    align: "left",
    headerAlign: "left",
    renderCell: (params: GridRenderCellParams<any, string>) =>
      params.value ? (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          View PDF
        </a>
      ) : (
        <span style={{ color: "var(--text)" }}>No scan</span>
      ),
  },
];

const ReceiptsDataGrid: FunctionComponent = () => {
  const { receipts, receiptsLoading } = useReceipts();

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={columns}
        loading={receiptsLoading}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
          },
        }}
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
