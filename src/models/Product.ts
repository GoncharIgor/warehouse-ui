export type Product = {
    id?: string;
    name: string;
    articles: [
        {
            id: string;
            amountRequired: number;
        }
    ];
};
