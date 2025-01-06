export default interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
  isChecked: boolean;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onToggleCheck: (id: number) => void;
}

export const sampleCartItems = [
  {
    id: 1,
    name: "Promio Body Lotion",
    price: 29.99,
    quantity: 2,
    image: require("../../assets/images/Product/P1.webp"),
    isChecked: true,
  },
  {
    id: 2,
    name: "Natural Organ Oil",
    price: 49.99,
    quantity: 1,
    image: require("../../assets/images/Product/P2.webp"),
    isChecked: false,
  },
  {
    id: 3,
    name: "Skin Oil Serum",
    price: 39.99,
    quantity: 3,
    image: require("../../assets/images/Product/P3.webp"),
    isChecked: false,
  },
  {
    id: 4,
    name: "Face Cream",
    price: 19.99,
    quantity: 2,
    image: require("../../assets/images/Product/P4.webp"),
    isChecked: true,
  },
  {
    id: 5,
    name: "Moisturizing Lotion",
    price: 24.99,
    quantity: 1,
    image: require("../../assets/images/Product/P5.webp"),
    isChecked: false,
  },
];
