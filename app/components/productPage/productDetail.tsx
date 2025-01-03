import React, { useState } from "react";
import Swiper from "react-native-swiper";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { XStack, Text, Image } from "tamagui";

const ProductDetailScreen = () => {
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = {
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300/FF0000",
      "https://via.placeholder.com/300/00FF00",
      "https://via.placeholder.com/300/0000FF",
    ],
    name: "Product Name",
    brand: "Brand Name",
    category: "Category Name",
    price: "$99.99",
    rating: 4.5,
    reviews: 120,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ratingsCount: {
      5: 50,
      4: 30,
      3: 20,
      2: 10,
      1: 10,
    },
  };

  // Hàm để tăng số lượng
  const increaseQuantity = () => setQuantity(quantity + 1);

  // Hàm để giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Tổng số đánh giá để tính tỷ lệ
  const totalReviews = Object.values(product.ratingsCount).reduce(
    (sum, count) => sum + count,
    0
  );

  // Hàm tính tỷ lệ phần trăm cho mỗi mức đánh giá sao
  const getRatingPercentage = (rating: keyof typeof product.ratingsCount) => {
    const count = product.ratingsCount[rating] || 0;
    return (count / totalReviews) * 100;
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Phần trên chứa hình ảnh (Carousel) */}
      <XStack
        padding={12}
        paddingHorizontal={20}
        backgroundColor="#0b0b0b"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FBFCD4" />
        </TouchableOpacity>
        <Text fontWeight="700" fontSize={18} color="#FBFCD4">
          Detail Product
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/components/cartPage/cart")}
        >
          <Ionicons name="bag-handle-outline" size={24} color="#FBFCD4" />
        </TouchableOpacity>
      </XStack>
      <View style={styles.imageContainer}>
        <Swiper
          style={styles.imageSwiper}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.productImage}
            />
          ))}
        </Swiper>
      </View>

      {/* Phần dưới là chi tiết sản phẩm */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>

        <View style={styles.tagContainer}>
          <View style={styles.brandItem}>
            <Text style={styles.tagText}>{product.brand}</Text>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.tagText}>{product.category}</Text>
          </View>
        </View>

        <Text style={styles.productRating}>
          Rating: {product.rating} ⭐ ({product.reviews} reviews)
        </Text>
        <Text style={styles.productDescription}>
          {showMore
            ? product.description
            : `${product.description.substring(0, 100)}...`}
        </Text>
        {product.description.length > 100 && (
          <TouchableOpacity onPress={() => setShowMore(!showMore)}>
            <Text style={styles.moreButton}>
              {showMore ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Khối nút Add to Cart và điều chỉnh số lượng */}
        <View style={styles.cartSection}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          {/* Phần tăng giảm số lượng */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={String(quantity)}
              keyboardType="numeric"
              editable={false}
            />
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phần Tổng Review */}
        <View style={styles.commentSection}>
          {/* Số lượng review và Write Review button */}
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewCount}>{product.reviews} Reviews</Text>
            <TouchableOpacity style={styles.writeReviewButton}>
              <Text style={styles.writeReviewText}>Write Review</Text>
            </TouchableOpacity>
          </View>

          {/* Hiển thị tổng số rating lớn bên trái */}
          <View style={styles.ratingStats}>
            <Text style={styles.totalRatingText}>{product.rating} ⭐</Text>

            {/* Thống kê rating (1, 2, 3, 4, 5 sao) nằm bên phải */}
            <View style={styles.ratingDistribution}>
              {Object.entries(product.ratingsCount).map(([rating, count]) => (
                <View key={rating} style={styles.ratingItem}>
                  <Text style={styles.ratingText}>
                    {rating} ⭐
                    <Text style={styles.ratingCount}> ({count})</Text>
                  </Text>

                  {/* Thanh tiến trình cho mức độ đánh giá */}
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${getRatingPercentage(
                            rating as unknown as 1 | 2 | 3 | 4 | 5
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Phần thông tin Review của User (mới thêm) */}
        <View style={styles.userReviews}>
          {/* 1. Thông tin user và nút chỉnh sửa */}
          <View style={styles.userHeader}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>User Name</Text>
              <Text style={styles.userEmail}>user@example.com</Text>
            </View>
            <TouchableOpacity style={styles.optionsButton}>
              <Text style={styles.optionsText}>...</Text>
            </TouchableOpacity>
          </View>

          {/* 2. Ngôi sao và tiêu đề đánh giá */}
          <View style={styles.ratingWithTitle}>
            <Text style={styles.starRating}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.reviewTitle}>Great Product!</Text>
          </View>

          {/* 3. Comment và thời gian */}
          <View style={styles.commentWithTime}>
            <Text style={styles.userComment}>
              This is a great product, totally worth the price. Highly
              recommended!
            </Text>
            <Text style={styles.reviewTime}>2 hours ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: 300,
  },
  imageSwiper: {
    height: "100%",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  productPrice: {
    fontSize: 20,
    color: "#e91e63",
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  brandItem: {
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  categoryItem: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tagText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "bold",
  },
  productRating: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  moreButton: {
    color: "#007bff",
    marginTop: 8,
  },
  cartSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 10,
  },
  addToCartButton: {
    backgroundColor: "#e91e63",
    padding: 12,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  quantityButton: {
    backgroundColor: "#e91e63",
    padding: 8,
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#fff",
    fontSize: 20,
  },
  quantityInput: {
    width: 50,
    textAlign: "center",
    fontSize: 18,
    padding: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  commentSection: {
    marginTop: 24,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  writeReviewButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  writeReviewText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingStats: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalRatingText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#444",
  },
  ratingDistribution: {
    flexDirection: "column",
    justifyContent: "center",
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 16,
    color: "#888",
  },
  progressBarContainer: {
    width: 150,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginLeft: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 8,
  },

  // New User Reviews Section Styles
  userReviews: {
    marginTop: 16,
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#777",
    marginLeft: 8,
  },
  optionsButton: {
    padding: 8,
  },
  optionsText: {
    fontSize: 20,
  },
  ratingWithTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  starRating: {
    fontSize: 16,
    color: "#FFD700",
  },
  reviewTitle: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  commentWithTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  userComment: {
    fontSize: 14,
    color: "#444",
    flex: 1,
  },
  reviewTime: {
    fontSize: 12,
    color: "#777",
    marginLeft: 8,
  },
});

export default ProductDetailScreen;
