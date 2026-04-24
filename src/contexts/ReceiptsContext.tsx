import { supabase } from "@/src/supabase/client";
import type { Receipts } from "@/src/types/receipts";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FunctionComponent,
  type ReactNode,
} from "react";

interface ReceiptsContextType {
  receipts: Receipts[];
  receiptsLoading: boolean;
  refreshReceipts: () => Promise<void>;
}

interface ReceiptsProviderProps {
  children: ReactNode;
}

const ReceiptsContext = createContext<ReceiptsContextType>({
  receipts: [],
  receiptsLoading: true,
  refreshReceipts: async () => {},
});

export const ReceiptsProvider: FunctionComponent<ReceiptsProviderProps> = ({
  children,
}) => {
  const [receipts, setReceipts] = useState<Receipts[]>([]);
  const [receiptsLoading, setReceiptsLoading] = useState<boolean>(true);

  const fetchReceipts = async () => {
    setReceiptsLoading(true);
    const { data } = await supabase.from("receipts").select();
    if (data) {
      setReceipts(data);
    }
    setReceiptsLoading(false);
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  return (
    <ReceiptsContext.Provider
      value={{
        receipts,
        receiptsLoading,
        refreshReceipts: fetchReceipts,
      }}
    >
      {children}
    </ReceiptsContext.Provider>
  );
};

export const useReceiptsContext = () => useContext(ReceiptsContext);
