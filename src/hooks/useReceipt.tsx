import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import type { Receipts } from "../types/receipts";

export function useReceipts() {
  const [receipts, setReceipts] = useState<Receipts[]>([]);

  useEffect(() => {
    getReceipts();
  }, []);

  async function getReceipts() {
    const { data } = await supabase.from("receipts").select();
    if (data) {
      setReceipts(data);
    }
  }

  return { receipts, setReceipts };
}
