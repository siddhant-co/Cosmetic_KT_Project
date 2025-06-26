import { Products } from "./testProductCardApi";

export const mockProducts: Products[] = [
  {
    id: 2,
    name: 'Cold Coffee with Vanilla Cream',
    price: 180,
    imageUrl: 'https://res.cloudinary.com/djdrop6np/image/upload/v1749746595/ecommerce-products/1749746595341-download%20%285%29.webp',
    userId: 1,
    stock: 15,
    is_new_arrival: false,
    is_active: true,
    tags: ['Cold-coffee', 'Sweet', 'Popular'],
    slug: 'cold-coffe-with-vanilla-cream',
    description: 'Indulge in the perfect blend of bold and smooth...',
    type: 'veg',
    categories: [
      {
        id: 2,
        name: 'Cold coffee',
        parentId: null,
        image: 'https://res.cloudinary.com/djdrop6np/image/upload/v1750144799/ecommerce-products/1750144835777-vecteezy_espresso-ice-coffee-in-glass_26774235.webp',
      },
    ],
    variants: [
      {
        id: 3,
        name: 'Chocolate',
        description: 'Cold coffee with chocolate cream',
        specification: { type: 'chocolate' },
        price: 180,
        basePrice: 200,
        stock: 10,
        productId: 2,
        images: [
          {
            id: 6,
            url: 'https://res.cloudinary.com/djdrop6np/image/upload/v1749746796/ecommerce-products/1749746794847-pexels-taryn-elliott-4144464.webp',
            variantId: 3,
          },
        ],
        Price: undefined
      },
      {
        id: 4,
        name: 'Ice',
        description: 'Cold coffee with ice cream',
        specification: { type: 'ice' },
        price: 150,
        basePrice: 180,
        stock: 10,
        productId: 2,
        images: [
          {
            id: 7,
            url: 'https://res.cloudinary.com/djdrop6np/image/upload/v1749746892/ecommerce-products/1749746889947-pexels-virgold-24433379.webp',
            variantId: 4,
          },
        ],
        Price: undefined
      },
    ],
    image: ''
  },
];
