export interface TProduct {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  storeName: string;
  categoryId: number;
  categoryName?: string;
  condition?: string;
  priceType?: string;
  location?: string;
  delivery?: string;
}
