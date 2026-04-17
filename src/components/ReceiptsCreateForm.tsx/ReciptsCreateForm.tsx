import {
  styled,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import type { FunctionComponent } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { supabase } from "../../supabase/client"; // Adjust the import path as needed
import type { ReceiptItems } from "../../types/receipts";
import dayjs, { Dayjs } from "dayjs";
import { useReceiptsContext } from "../../contexts/ReceiptsContext";

interface ReceiptsCreateFormProps {
  onSuccess?: () => void;
}

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const ReceiptsCreateForm: FunctionComponent<ReceiptsCreateFormProps> = ({
  onSuccess,
}) => {
  const { refreshReceipts } = useReceiptsContext();
  const [formData, setFormData] = useState({
    date: dayjs(),
    items: [{ name: "", amount: 1 }] as ReceiptItems[],
    store: "",
    location: "",
    gluten_total: "" as unknown as any as number,
    receipt_total: "" as unknown as any as number,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]:
        id === "gluten_total" || id === "receipt_total"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        date: date,
      }));
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof ReceiptItems,
    value: string | number,
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "amount" ? Number(value) : value,
    };
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", amount: 1 }],
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = [...formData.items];
    if (updatedItems.length > 1) {
      // Ensure at least one item remains
      updatedItems.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        items: updatedItems,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        date: formData.date.format("YYYY-MM-DD"), // Dayjs helper
      };

      const { error } = await supabase.from("receipts").insert([formattedData]);
      if (error) throw error;

      await refreshReceipts();
      // Reset form
      setFormData({
        date: dayjs(), // Reset to dayjs object
        items: [{ name: "", amount: 1 }],
        store: "",
        location: "",
        gluten_total: "" as unknown as any as number,
        receipt_total: "" as unknown as any as number,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#121212",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        padding: "24px",
      }}
    >
      <Grid container spacing={3}>
        <FormGrid size={12}>
          <DatePicker
            label="Date on Receipt"
            value={formData.date}
            onChange={handleDateChange}
            slotProps={{ textField: { required: true } }}
          />
        </FormGrid>

        <FormGrid size={12}>
          <Typography variant="subtitle1" gutterBottom>
            Items
          </Typography>
          {formData.items.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <TextField
                required
                label="Item Name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <TextField
                required
                label="Amount"
                type="number"
                value={item.amount}
                onChange={(e) =>
                  handleItemChange(index, "amount", e.target.value)
                }
                sx={{ width: 120, mr: 1 }}
              />
              <IconButton
                onClick={() => removeItem(index)}
                color="error"
                disabled={formData.items.length <= 1} // Disable if only one item
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addItem}
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Add Item
          </Button>
        </FormGrid>

        <FormGrid size={12}>
          <TextField
            required
            id="store"
            label="Store"
            placeholder="Store Name"
            value={formData.store}
            onChange={handleChange}
            fullWidth
          />
        </FormGrid>

        <FormGrid size={12}>
          <TextField
            required
            id="location"
            label="Store Location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
        </FormGrid>

        <FormGrid size={12}>
          <TextField
            required
            id="gluten_total"
            label="Gluten Total"
            placeholder="€0.00"
            type="number"
            value={formData.gluten_total}
            onChange={handleChange}
            fullWidth
          />
        </FormGrid>

        <FormGrid size={12}>
          <TextField
            required
            id="receipt_total"
            label="Receipt Total"
            placeholder="€0.00"
            type="number"
            value={formData.receipt_total}
            onChange={handleChange}
            fullWidth
          />
        </FormGrid>

        <Grid
          size={12}
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
        >
          <Button type="submit" variant="contained" color="primary">
            Create Receipt
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReceiptsCreateForm;
