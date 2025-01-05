export default interface StoreReview {
  name: string;
  email: string;
  image: any;
  rating: number;
  comment: string;
  title: string;
}

// Sample comment data
export const sampleComment = [
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    image: require("../../assets/images/model.jpg"), // Local image path
    rating: 4.5,
    comment: "Excellent product quality, fast delivery service.",
    title: "Great Experience",
  },
  {
    name: "Emily Johnson",
    email: "emilyj@example.com",
    image: require("../../assets/images/model.jpg"), // Local image path
    rating: 4.8,
    comment: "Friendly staff and great customer service. Highly recommended!",
    title: "Outstanding Service",
  },
  {
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    image: require("../../assets/images/model.jpg"), // Local image path
    rating: 4.0,
    comment: "Good product overall, but the packaging could be improved.",
    title: "Good Product",
  },
  {
    name: "Sarah Williams",
    email: "sarahw@example.com",
    image: require("../../assets/images/model.jpg"), // Local image path
    rating: 3.8,
    comment: "Delivery was a bit late, but the product quality was great.",
    title: "Satisfactory",
  },
  {
    name: "David Wilson",
    email: "davidwilson@example.com",
    image: require("../../assets/images/model.jpg"), // Local image path
    rating: 5.0,
    comment: "Perfect shopping experience! Will definitely buy again.",
    title: "Excellent",
  },
  {
    name: "Sophia Taylor",
    email: "sophiataylor@example.com",
    image: require("../../assets/images/model.jpg"), // Local image path
    rating: 4.7,
    comment: "The service was fantastic, and the delivery was quick.",
    title: "Highly Recommend",
  },
  {
    name: "James Anderson",
    email: "jamesanderson@example.com",
    image: require("../../assets/images/model.jpg"), // Local image path
    rating: 4.3,
    comment: "Great value for the price. Customer service was helpful.",
    title: "Good Value",
  },
  {
    name: "Olivia Martin",
    email: "oliviamartin@example.com",
    image: require("../../assets/images/model.jpg"), // Local image path
    rating: 4.9,
    comment: "Loved the packaging and product quality. Excellent service!",
    title: "Fantastic",
  },
];
