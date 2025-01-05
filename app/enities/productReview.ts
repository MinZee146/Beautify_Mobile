export default interface ProductReview {
  name: string;
  email: string;
  image: any;
  rating: number;
  title: string;
  comment: string;
}

export const sampleReviews = [
  {
    userName: "Kamila Kabelo",
    userEmail: "kamila@example.com",
    userImage: require("../../assets/images/model.jpg"),
    rating: 5,
    title: "Impressive app!",
    comment:
      "It simplifies hotel bookings with its user-friendly interface and great prices. Never disappoints. A must-have for frequent travelers.",
  },
  {
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    userImage: require("../../assets/images/model.jpg"),
    rating: 4.5,
    title: "Excellent service",
    comment:
      "The support team was very responsive and helpful. Highly recommended!",
  },
];
