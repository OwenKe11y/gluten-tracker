import { useReceiptsContext } from "@/src/contexts/ReceiptsContext";
import { supabase } from "@/src/supabase/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import type { FunctionComponent } from "react";

interface DeleteButtonProps {
  id: number;
}

const DeleteButton: FunctionComponent<DeleteButtonProps> = ({ id }) => {
  const { refreshReceipts } = useReceiptsContext(); // Ensure this is available in your component

  const handleDelete = async () => {
    // 1. Confirm with user
    if (window.confirm("Are you sure you want to delete this receipt?")) {
      try {
        // 2. Call Supabase
        const { error } = await supabase.from("receipts").delete().eq("id", id); // Assuming 'id' is your primary key

        if (error) throw error;

        // 3. Refresh context state to update the grid
        await refreshReceipts();
      } catch (error) {
        console.error("Error deleting receipt:", error);
        alert("Failed to delete receipt.");
      }
    }
  };

  return (
    <IconButton onClick={handleDelete}>
      <DeleteIcon color="error" />
    </IconButton>
  );
};

export default DeleteButton;
