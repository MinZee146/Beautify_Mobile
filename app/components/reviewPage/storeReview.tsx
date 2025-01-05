import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { sampleComment } from "@/app/enities/storeReview"; // Ensure this is imported correctly
import StoreReview from "@/app/enities/storeReview";

// Entity structure for Comment
const createComment = (
  id: string,
  name: string,
  email: string,
  rating: number,
  comment: string,
  date: string
): StoreReview => ({
  id,
  name,
  email,
  rating,
  comment,
  date,
  profilePicture: undefined,
});

const CommentScreen = () => {
  const [comments, setComments] = useState<StoreReview[]>(sampleComment); // Initialize with sample comments
  const [newComment, setNewComment] = useState("");
  const [productRating, setProductRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);

  const addNewComment = () => {
    const id = (comments.length + 1).toString(); // Simple ID generation
    const date = new Date().toLocaleDateString();
    const totalRating = (
      (productRating + serviceRating + deliveryRating) /
      3
    ).toFixed(1); // Tính rating trung bình

    const newCommentObj = createComment(
      id,
      newName,
      newEmail,
      parseFloat(totalRating),
      newComment,
      date
    );

    setComments((prevComments) => [...prevComments, newCommentObj]);

    // Clear form sau khi gửi
    setNewComment("");
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
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <View style={styles.commentInfo}>
          <Text style={styles.commentName}>{item.name}</Text>
          <Text style={styles.commentEmail}>{item.email}</Text>
        </View>
        <Rating
          startingValue={item.rating}
          readonly
          imageSize={20}
          style={styles.ratingStars}
        />
        <Text style={styles.ratingText}>{item.rating.toFixed(1)} / 5</Text>
      </View>
      <Text style={styles.commentText}>{item.comment}</Text>
      <Text style={styles.commentDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Bài đánh giá</Text>
      </View>

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
            style={{ marginVertical: 5 }}
          />
          <Text style={styles.totalReviews}>
            {ratingsSummary.totalReviews} đánh giá
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
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.commentList}
      />

      {/* Add Comment Button */}
      <TouchableOpacity
        style={styles.addCommentButton}
        onPress={() => setShowAddComment(!showAddComment)}
      >
        <Text style={styles.addCommentButtonText}>
          {showAddComment ? "Ẩn" : "Thêm Bình Luận"}
        </Text>
      </TouchableOpacity>

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
            placeholder="Tên"
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
            placeholder="Bình luận"
            value={newComment}
            onChangeText={setNewComment}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={addNewComment}>
            <Text style={styles.submitButtonText}>Gửi Bình Luận</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
  },
  overallRatingSection: {
    width: "40%",
    alignItems: "center",
  },
  overallRatingText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  totalReviews: {
    marginVertical: 5,
    color: "#777",
  },
  criteriaRatingSection: {
    flex: 1,
    paddingLeft: 15,
  },
  criteriaRow: {
    flexDirection: "row",
    marginBottom: 5,
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
    flex: 1,
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
  },
  commentList: {
    paddingHorizontal: 15,
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
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    margin: 15,
    alignItems: "center",
  },
  addCommentButtonText: {
    color: "#fff",
    fontSize: 16,
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
