import create from 'zustand';
import { Product } from '../models';

interface ProductsStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    fetchProductsFromServerError: string;
    setIsFetchingProductsFromApiErrorOccurred: (isOccurred: string) => void;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
    products: [],
    fetchProductsFromServerError: '',
    setProducts: (products: Product[]) => {
        set({ products });
    },
    setIsFetchingProductsFromApiErrorOccurred: (error: string) => {
        set({ fetchProductsFromServerError: error });
    }
}));
