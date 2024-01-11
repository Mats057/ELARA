export interface Clothes {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    images: [
        {
            path: string;
            color: string;
        }
    ]
    sizes: string[]
}
