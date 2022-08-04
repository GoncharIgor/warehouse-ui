import create from 'zustand';
import { Sale } from '../models';

interface SalesStore {
    sales: Sale[];
    setSales: (sales: Sale[]) => void;
    fetchSalesFromServerError: string;
    setIsFetchingSalesFromApiErrorOccurred: (isOccurred: string) => void;
}

export const useSalesStore = create<SalesStore>((set, get) => ({
    sales: [],
    fetchSalesFromServerError: '',
    setSales: (sales: Sale[]) => {
        set({ sales });
    },
    setIsFetchingSalesFromApiErrorOccurred: (error: string) => {
        set({ fetchSalesFromServerError: error });
    }
}));
