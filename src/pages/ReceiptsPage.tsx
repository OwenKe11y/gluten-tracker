import { useState, type FunctionComponent, useEffect } from "react";
import { supabase } from "../supabase/client";
import { Box } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

interface Receipts {
  id: string;
  date: string;
  items: string[];
  store: string;
  location: string;
  gluten_total: number;
  receipt_total: number;
}

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
  },
  {
    field: "store",
    headerName: "Store",
    type: "number",
    flex: 1,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "location",
    headerName: "Location",
    type: "number",
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

const ReceiptsPage: FunctionComponent = () => {
  const [receipts, setReceipts] = useState<Receipts[]>([]);

  useEffect(() => {
    getReceipts();
  }, []);

  async function getReceipts() {
    const { data } = await supabase.from("receipts").select().limit(10);
    if (data) {
      setReceipts(data);
    }
  }

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
      />
    </Box>
  );
};

export default ReceiptsPage;
