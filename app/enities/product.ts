export default interface Product {
  name: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
}

export const sampleProducts = [
  {
    name: "Promio Body Lotion",
    image: "https://via.placeholder.com/150",
    price: "29.99",
    rating: 4.5,
    reviews: 120,
  },
  {
    name: "Natural Organ Oil",
    image: "https://via.placeholder.com/150",
    price: "49.99",
    rating: 4.8,
    reviews: 200,
  },
  {
    name: "Skin Oil Serum",
    image: "https://via.placeholder.com/150",
    price: "39.99",
    rating: 4.7,
    reviews: 180,
  },
  {
    name: "Face Cream",
    image: "https://via.placeholder.com/150",
    price: "19.99",
    rating: 4.3,
    reviews: 80,
  },
  {
    name: "Moisturizing Lotion",
    image: "https://via.placeholder.com/150",
    price: "24.99",
    rating: 4.6,
    reviews: 95,
  },
];
