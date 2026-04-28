import type { ReceiptFormState } from "@/src/components/ReceiptsCreateForm/types";
import { supabase } from "@/src/supabase/client";
import { INITIAL_FORM_STATE } from "@/src/types/constants";
import type { ReceiptItems } from "@/src/types/receipts";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useReceiptsContext } from "../../contexts/ReceiptsContext";

interface ReceiptsCreateFormProps {
  onSuccess?: () => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// const FormGrid = styled(Grid)(() => ({
//   display: "flex",
//   flexDirection: "column",
// }));

const ReceiptsCreateForm: FunctionComponent<ReceiptsCreateFormProps> = ({
  onSuccess,
}) => {
  const { refreshReceipts } = useReceiptsContext();
  const [getImageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] =
    useState<ReceiptFormState>(INITIAL_FORM_STATE);

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

  const handleFileUpload = async (file: File) => {
    if (!file) return null;

    setUploading(true);
    const storeName = formData.store.replace(/\s+/g, "_").toLowerCase();
    const dateStr = formData.date.format("YYYY-MM-DD");
    const fileExt = file.name.split(".").pop();
    const fileName = `${storeName}_${dateStr}.${fileExt}`;
    const renamedFile = new File([file], fileName, { type: file.type });
    setImageFile(renamedFile);

    const { error } = await supabase.storage
      .from("scans")
      .upload(`${fileName}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage
      .from("scans")
      .getPublicUrl(`${fileName}`);

    setUploading(false);
    return urlData.publicUrl;
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

  const areAllFieldsFilled = () => {
    return (
      formData.store &&
      formData.location &&
      formData.items.every((item) => item.name.trim())
    );
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
      setFormData(INITIAL_FORM_STATE);

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
        borderRadius: "12px",
      }}
    >
      <Grid container spacing={3}>
        {/* Form Grid Items */}
        <Grid size={6}>
          <Grid container spacing={3}>
            <Grid size={6}>
              <DatePicker
                label="Date on Receipt"
                value={formData.date}
                onChange={handleDateChange}
                slotProps={{ textField: { required: true } }}
              />
            </Grid>

            <Grid size={12}>
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
                    disabled={formData.items.length <= 1}
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
            </Grid>

            <Grid size={6}>
              <TextField
                required
                id="store"
                label="Store"
                placeholder="Store Name"
                value={formData.store}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={6}>
              <TextField
                required
                id="location"
                label="Store Location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={6}>
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
            </Grid>

            <Grid size={6}>
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
            </Grid>

            <Typography>{getImageFile?.name}</Typography>
          </Grid>
        </Grid>

        {/* Upload Button Grid Item */}
        <Grid size={6} sx={{ display: "flex", alignItems: "center" }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            disabled={uploading || !areAllFieldsFilled()}
          >
            {uploading ? "Uploading..." : "Upload Receipt Scan"}
            <VisuallyHiddenInput
              type="file"
              accept=".pdf"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  const imageUrl = await handleFileUpload(file);
                  if (imageUrl) {
                    setFormData((prev) => ({
                      ...prev,
                      image_link: imageUrl,
                    }));
                  }
                }
              }}
            />
          </Button>
        </Grid>
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
