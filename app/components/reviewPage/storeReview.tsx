import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { sampleComment } from "@/app/enities/storeReview"; // Ensure this is imported correctly
import StoreReview from "@/app/enities/storeReview";
import { View, Text, XStack, Image, ScrollView } from "tamagui";
import { useRouter } from "expo-router";

// Entity structure for Comment
const createComment = (
  name: string,
  email: string,
  rating: number,
  comment: string,
  title: string,
  image: any
): StoreReview => ({
  name,
  email,
  rating,
  comment,
  title,
  image,
});

const CommentScreen = () => {
  const [comments, setComments] = useState<StoreReview[]>(sampleComment); // Initialize with sample comments
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [productRating, setProductRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);

  const addNewComment = () => {
    const totalRating = (
      (productRating + serviceRating + deliveryRating) /
      3
    ).toFixed(1); // Tính rating trung bình

    const newCommentObj = createComment(
      newName,
      newEmail,
      parseFloat(totalRating),
      newComment,
      newTitle,
      require("../../../assets/images/model.jpg")
    );

    setComments((prevComments) => [...prevComments, newCommentObj]);

    // Clear form sau khi gửi
    setNewComment("");
    setNewTitle("");
    setNewName("");
    setNewEmail("");
    setProductRating(5);
    setServiceRating(5);
    setDeliveryRating(5);
  };

  const calculateRatingsSummary = () => {
    const totalReviews = comments.length;
    const productQuality = 4.5;
    const serviceQuality = 4.0;
    const deliveryQuality = 4.7;
    return { productQuality, serviceQuality, deliveryQuality, totalReviews };
  };

  const ratingsSummary = calculateRatingsSummary();

  const renderComment = ({ item }: { item: StoreReview }) => (
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
            source={item.image}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 12,
            }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 2 }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 13, color: "#888" }}>{item.email}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 20, color: "#FAAF00", fontWeight: "bold" }}>
          <AntDesign name="star" size={14} color="#FFD700" />{" "}
          {item.rating.toFixed(1)}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
          {item.title}
        </Text>
        <Text style={{ fontSize: 14, color: "#444", marginTop: 4 }}>
          {item.comment}
        </Text>
      </View>
    </View>
  );

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}

      <XStack
        padding={12}
        paddingHorizontal={20}
        backgroundColor="#0b0b0b"
        alignItems="center"
        borderBottomWidth={1}
        borderColor="#e0e0e0"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FBFCD4" />
        </TouchableOpacity>
        <Text marginLeft={16} fontWeight="700" fontSize={18} color="#FBFCD4">
          Shop Reviews
        </Text>
      </XStack>
      <ScrollView>
        <View style={{ padding: 16 }}>
          {/* Rating Summary and Criteria */}
          <View style={styles.ratingContainer}>
            <View style={styles.overallRatingSection}>
              <Text style={styles.overallRatingText}>
                {(
                  (ratingsSummary.productQuality +
                    ratingsSummary.serviceQuality +
                    ratingsSummary.deliveryQuality) /
                  3
                ).toFixed(1)}
              </Text>
              <Rating
                startingValue={
                  (ratingsSummary.productQuality +
                    ratingsSummary.serviceQuality +
                    ratingsSummary.deliveryQuality) /
                  3
                }
                readonly
                imageSize={20}
                style={{
                  marginVertical: 5,
                }}
              />

              <Text style={styles.totalReviews}>
                {ratingsSummary.totalReviews} Reviews
              </Text>
            </View>

            <View style={styles.criteriaRatingSection}>
              <View style={styles.criteriaRow}>
                <Text style={styles.criteriaLabel}>Product Quality</Text>
              </View>
              <View style={styles.progressRow}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(ratingsSummary.productQuality / 5) * 100}%`,
                        backgroundColor: "#4CAF50",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.criteriaValue}>
                  {ratingsSummary.productQuality}/5
                </Text>
              </View>

              <View style={styles.criteriaRow}>
                <Text style={styles.criteriaLabel}>Service Quality</Text>
              </View>
              <View style={styles.progressRow}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(ratingsSummary.serviceQuality / 5) * 100}%`,
                        backgroundColor: "#4CAF50",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.criteriaValue}>
                  {ratingsSummary.serviceQuality}/5
                </Text>
              </View>

              <View style={styles.criteriaRow}>
                <Text style={styles.criteriaLabel}>Delivery Quality</Text>
              </View>
              <View style={styles.progressRow}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(ratingsSummary.deliveryQuality / 5) * 100}%`,
                        backgroundColor: "#4CAF50",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.criteriaValue}>
                  {ratingsSummary.deliveryQuality}/5
                </Text>
              </View>
            </View>
          </View>

          {/* Comment List */}

          <XStack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={12}
          >
            <Text fontSize={24} fontWeight={600}>
              Reviews ({comments.length})
            </Text>
            {/* Add Comment Button */}
            <TouchableOpacity
              style={styles.addCommentButton}
              onPress={() => setShowAddComment(!showAddComment)}
            >
              <Text style={styles.addCommentButtonText}>
                {showAddComment ? "HIDE" : "ADD REVIEW"}
              </Text>
            </TouchableOpacity>
          </XStack>
          <FlatList data={comments} renderItem={renderComment} />

          {/* Add Comment Form */}
          {showAddComment && (
            <View style={styles.addCommentForm}>
              {/* Rating Section */}
              <View style={styles.ratingCriteria}>
                <Text style={styles.criteriaLabel}>Đánh giá sản phẩm</Text>
                <Rating
                  startingValue={productRating}
                  onFinishRating={setProductRating}
                  imageSize={20}
                  style={styles.ratingStars}
                />
              </View>
              <View style={styles.ratingCriteria}>
                <Text style={styles.criteriaLabel}>Đánh giá dịch vụ</Text>
                <Rating
                  startingValue={serviceRating}
                  onFinishRating={setServiceRating}
                  imageSize={20}
                  style={styles.ratingStars}
                />
              </View>
              <View style={styles.ratingCriteria}>
                <Text style={styles.criteriaLabel}>Đánh giá giao hàng</Text>
                <Rating
                  startingValue={deliveryRating}
                  onFinishRating={setDeliveryRating}
                  imageSize={20}
                  style={styles.ratingStars}
                />
              </View>

              {/* User Information Section */}
              <TextInput
                style={styles.inputField}
                placeholder="Name"
                value={newName}
                onChangeText={setNewName}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Email"
                value={newEmail}
                onChangeText={setNewEmail}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Title"
                value={newTitle}
                onChangeText={setNewTitle}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Comment"
                value={newComment}
                onChangeText={setNewComment}
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={addNewComment}
              >
                <Text style={styles.submitButtonText}>Gửi Bình Luận</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D3C8",
  },
  ratingContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    alignItems: "center",
    borderRadius: 16,
  },
  overallRatingSection: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 16,
  },
  overallRatingText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  totalReviews: {
    marginVertical: 5,
    color: "#777",
  },
  criteriaRatingSection: {
    flex: 2,
    paddingLeft: 8,
  },
  criteriaRow: {
    flexDirection: "row",
  },
  criteriaLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
    flex: 0.8,
    marginVertical: 5,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  criteriaValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "right",
    flex: 0.2,
  },
  commentItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentInfo: {
    flex: 1,
  },
  commentName: {
    fontWeight: "bold",
  },
  commentEmail: {
    fontSize: 12,
    color: "#777",
  },
  ratingStars: {
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 12,
    color: "#777",
  },
  commentText: {
    marginVertical: 5,
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
  },
  addCommentButton: {
    backgroundColor: "#3348D4",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  addCommentButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  addCommentForm: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingCriteria: {
    marginBottom: 10,
    alignItems: "center",
  },
});

export default CommentScreen;
