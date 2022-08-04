import create from 'zustand';
import {Article, Sale} from '../models';

interface SalesStore {
    sales: Sale[];
    setSales: (sales: Sale[]) => void;
    fetchSalesFromServerError: string;
    addSale: (newSale: Sale) => void;
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
    },
    addSale: (newSale: Sale) => {
        set((store) => ({ sales: [...store.sales, newSale] }));
    },
}));
