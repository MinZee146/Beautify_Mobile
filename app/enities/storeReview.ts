export default interface StoreReview {
  id: string;
  name: string;
  email: string;
  profilePicture: any;
  rating: number;
  comment: string;
  date: string;
}

// Sample comment data
export const sampleComment = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    profilePicture: "../../assets/images/model.jpg", // Local image path or URL
    rating: 4.5,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    date: "2025-01-01",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    profilePicture: "../../assets/images/model.jpg", // External image URL
    rating: 4.8,
    comment: "Cửa hàng phục vụ rất nhiệt tình, giá cả hợp lý.",
    date: "2025-01-02",
  },
  // Add more sample comments here
];
