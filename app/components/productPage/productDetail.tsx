import React, { useState } from "react";
import Swiper from "react-native-swiper";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { XStack, Text, Image, YStack, View } from "tamagui";
import ProductReview, { sampleReviews } from "@/app/enities/productReview";

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

      {/* Phần dưới là chi tiết sản phẩm */}
      <ScrollView>
        <View style={styles.imageContainer}>
          <Swiper
            style={styles.imageSwiper}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={5}
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
        <View style={styles.scrollContent}>
          <View style={styles.tagContainer}>
            <View style={styles.brandItem}>
              <Text style={styles.tagText}>{product.brand}</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text style={styles.tagText}>{product.category}</Text>
            </View>
          </View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>

          <Text style={styles.productRating}>
            <Ionicons name="star" color="#FAAF00" size={14} /> {product.rating}
            <Text fontWeight={500}> ({product.reviews})</Text>
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
              <Text style={styles.addToCartText}>ADD TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyText}>BUY NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phần Tổng Review */}
        <View style={{ backgroundColor: "#F5F6F8", padding: 16 }}>
          {/* Số lượng review và Write Review button */}
          <YStack>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewCount}>{product.reviews} Reviews</Text>
              <TouchableOpacity style={styles.writeReviewButton}>
                <Text style={styles.writeReviewText}>Write Review</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ratingStatsContainer}>
              {/* Bên trái: Tổng số rating */}
              <View style={styles.totalRatingContainer}>
                <Text style={styles.totalRatingText}>{product.rating}</Text>
                <View style={styles.starContainer}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Ionicons
                      key={index}
                      name={
                        index < Math.floor(product.rating)
                          ? "star"
                          : "star-outline"
                      }
                      size={20}
                      color="#000"
                    />
                  ))}
                </View>
              </View>

              {/* Bên phải: Phân phối rating */}
              <View style={styles.ratingDistribution}>
                {Object.entries(product.ratingsCount).map(([rating, count]) => (
                  <View key={rating} style={styles.ratingItem}>
                    <Text style={styles.ratingText}>
                      {rating} <Ionicons name="star" color="#000" />{" "}
                      <Text style={styles.ratingCount}>({count})</Text>
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.ratingPocessing}>
                {Object.entries(product.ratingsCount).map(([rating, count]) => (
                  <View key={rating} style={styles.ratingItem}>
                    <Text style={styles.ratingText}></Text>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          {
                            width: `${getRatingPercentage(
                              rating as unknown as keyof typeof product.ratingsCount
                            )}%`,
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </YStack>
          <View paddingTop={16}>
            {sampleReviews.map((review, index) => (
              <ReviewCard
                key={index}
                userName={review.userName}
                userEmail={review.userEmail}
                userImage={review.userImage}
                rating={review.rating}
                title={review.title}
                comment={review.comment}
              />
            ))}
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
  imageContainer: { width: "100%", aspectRatio: 1 },
  imageSwiper: { height: "100%" },
  productImage: { width: "100%", aspectRatio: 1, resizeMode: "cover" },
  scrollContent: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  productPrice: {
    fontSize: 20,
    color: "#e91e63",
    fontWeight: "bold",
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  brandItem: {
    backgroundColor: "#76A188",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  categoryItem: {
    backgroundColor: "#76A188",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  tagText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  productRating: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
    marginBottom: 12,
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
    backgroundColor: "#2E7D32",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#fff",
    padding: 11,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0288D1",
    flex: 1,
  },
  buyText: {
    color: "#0288D1",
    fontSize: 14,
    fontWeight: "bold",
  },
  ratingStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  totalRatingContainer: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    paddingBottom: 16,
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  ratingDistribution: {
    flex: 2,
    justifyContent: "center",
  },
  ratingPocessing: {
    flex: 4,
    justifyContent: "center",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  writeReviewButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0288D1",
  },
  writeReviewText: {
    color: "#0288D1",
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
});

export default ProductDetailScreen;

const ReviewCard = ({
  userName,
  userEmail,
  userImage,
  rating,
  title,
  comment,
}: ProductReview) => {
  return (
    <View
      style={{
        flexDirection: "column",
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={userImage}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 12,
            }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 2 }}>
              {userName}
            </Text>
            <Text style={{ fontSize: 13, color: "#888" }}>{userEmail}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 20, color: "#FAAF00", fontWeight: "bold" }}>
          <Ionicons name="star" color="#FAAF00" size={16} /> {rating.toFixed(2)}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#444", marginTop: 4 }}>
          {comment}
        </Text>
      </View>
    </View>
  );
};
