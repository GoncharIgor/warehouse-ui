import create from 'zustand';
import { Product } from '../models';

interface ProductsStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    fetchProductsFromServerError: string;
    getProductById: (id: string) => any;
    setIsFetchingProductsFromApiErrorOccurred: (isOccurred: string) => void;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
    products: [],
    fetchProductsFromServerError: '',
    setProducts: (products: Product[]) => {
        set({ products });
    },
    getProductById: (productId: string) => {
        if (!productId) return null;

        const retrievedProducts = get().products;
        return retrievedProducts.find((product) => product.id === productId);
    },
    setIsFetchingProductsFromApiErrorOccurred: (error: string) => {
        set({ fetchProductsFromServerError: error });
    }
}));
