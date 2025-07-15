import { TProduct } from '@/interfaces';

export const PRODUCTS: TProduct[] = [
  {
    id: '1',
    name: 'Potato',
    price: 35,
    discountPrice: 30,
    storeName: 'Fresh Market',
    categoryId: 1,
    images: [
      'https://i.pinimg.com/474x/ba/b3/18/bab31873cf89cde0aae2635159ca508a.jpg',
    ],
    description: 'Fresh and high-quality potatoes.',
  },
  {
    id: '2',
    name: 'Duck Egg',
    price: 32,
    discountPrice: 30,
    storeName: 'Egg Store',
    categoryId: 2,
    images: [
      'https://i.pinimg.com/474x/79/65/43/7965432a0dc8ed8ad5944ba5091dc07b.jpg',
    ],
    description: 'Farm-fresh duck eggs.',
  },
  {
    id: '3',
    name: 'Carrot',
    price: 25,
    discountPrice: 20,
    storeName: 'Healthy Food',
    categoryId: 3,
    images: [
      'https://i.pinimg.com/474x/ba/b3/18/bab31873cf89cde0aae2635159ca508a.jpg',
    ],
    description: 'Fresh carrots rich in vitamins.',
  },
  {
    id: '4',
    name: 'Cucumber',
    price: 18,
    discountPrice: 15,
    storeName: 'Green Vegetables',
    categoryId: 4,
    images: [
      'https://i.pinimg.com/474x/79/65/43/7965432a0dc8ed8ad5944ba5091dc07b.jpg',
    ],
    description: 'Fresh cucumbers for salads.',
  },
  {
    id: '5',
    name: 'Tomato',
    price: 30,
    discountPrice: 25,
    storeName: 'Organic Farm',
    categoryId: 5,
    images: [
      'https://i.pinimg.com/474x/ba/b3/18/bab31873cf89cde0aae2635159ca508a.jpg',
    ],
    description: 'Juicy tomatoes from organic farms.',
  },
  {
    id: '6',
    name: 'Onion',
    price: 15,
    discountPrice: 12,
    storeName: 'Spicy Foods',
    categoryId: 6,
    images: [
      'https://i.pinimg.com/474x/ba/b3/18/bab31873cf89cde0aae2635159ca508a.jpg',
    ],
    description: 'Spicy and flavorful onions.',
  },
  {
    id: '7',
    name: 'Garlic',
    price: 10,
    discountPrice: 8,
    storeName: 'Spices and Herbs',
    categoryId: 7,
    images: [
      'https://i.pinimg.com/474x/79/65/43/7965432a0dc8ed8ad5944ba5091dc07b.jpg',
    ],
    description: 'Garlic for adding flavor to your dishes.',
  },
  {
    id: '8',
    name: 'Lettuce',
    price: 20,
    discountPrice: 18,
    storeName: 'Fresh Greens',
    categoryId: 8,
    images: [
      'https://i.pinimg.com/474x/ba/b3/18/bab31873cf89cde0aae2635159ca508a.jpg',
    ],
    description: 'Fresh lettuce for salads and sandwiches.',
  },
];
