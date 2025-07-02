export interface TProduct {
  id: string;
  name: string;
  oldPrice?: number;
  newPrice: number;
  discount?: number;
  images: string[];
  description: string;
  storeName: string;
  categoryId: number;
}
