export default interface Product {
  name: string;
  image: any;
  price: string;
  rating: number;
  reviews: number;
}

export const sampleProducts = [
  {
    name: "Promio Body Lotion",
    image: require("../../assets/images/Product/P1.webp"),
    price: "29.99",
    rating: 4.5,
    reviews: 120,
  },
  {
    name: "Natural Organ Oil",
    image: require("../../assets/images/Product/P2.webp"),
    price: "49.99",
    rating: 4.8,
    reviews: 200,
  },
  {
    name: "Skin Oil Serum",
    image: require("../../assets/images/Product/P3.webp"),
    price: "39.99",
    rating: 4.7,
    reviews: 180,
  },
  {
    name: "Face Cream",
    image: require("../../assets/images/Product/P4.webp"),
    price: "19.99",
    rating: 4.3,
    reviews: 80,
  },
  {
    name: "Moisturizing Lotion",
    image: require("../../assets/images/Product/P5.webp"),
    price: "24.99",
    rating: 4.6,
    reviews: 95,
  },
];
