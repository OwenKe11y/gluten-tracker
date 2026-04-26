import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { supabase } from '../supabase/client';

export function useGraphData() {
    const currentYear = dayjs().year();

    return useQuery({
        queryKey: ['yearlyGraphData', currentYear],
        queryFn: async () => {
            // Get start and end of current year
            const startDate = `${currentYear}-01-01`;
            const endDate = `${currentYear}-12-31`;

            const { data, error } = await supabase
                .from('receipts')
                .select('date, gluten_total, receipt_total')
                .gte('date', startDate)
                .lte('date', endDate)
                .order('date', { ascending: true });

            if (error) throw error;

            // Format data for graphs
            return data.map(item => ({
                date: item.date,
                glutenTotal: item.gluten_total,
                receiptTotal: item.receipt_total,
            }));
        },
        staleTime: Infinity,
    });
}