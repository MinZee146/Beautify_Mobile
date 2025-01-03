import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { ProgressBar } from "react-native-paper";

const CommentScreen = () => {
  const [comments, setComments] = useState([
    {
      id: "1",
      name: "Nguyễn Văn A",
      rating: 4,
      comment: "Sản phẩm rất tốt, giao hàng nhanh.",
      date: "2025-01-01",
    },
    {
      id: "2",
      name: "Trần Thị B",
      rating: 5,
      comment: "Cửa hàng phục vụ rất nhiệt tình, giá cả hợp lý.",
      date: "2025-01-02",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [showAddComment, setShowAddComment] = useState(false); // To toggle visibility of add comment section

  const calculateRatingsSummary = () => {
    const totalReviews = comments.length;
    const productQuality = 4.5; // Placeholder, can be calculated dynamically
    const serviceQuality = 4.0; // Placeholder
    const deliveryQuality = 4.7; // Placeholder
    return { productQuality, serviceQuality, deliveryQuality, totalReviews };
  };

  const ratingsSummary = calculateRatingsSummary();

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Vui lòng nhập bình luận.");
      return;
    }

    const newCommentData = {
      id: (comments.length + 1).toString(),
      name: "Khách hàng", // Placeholder name
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split("T")[0], // Current date
    };

    setComments([newCommentData, ...comments]);
    setNewComment("");
    setNewRating(5);
    setShowAddComment(false); // Hide comment section after submitting
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentName}>{item.name}</Text>
        <Rating
          startingValue={item.rating}
          readonly
          imageSize={16}
          style={{ marginLeft: 10 }}
        />
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
        <Text style={styles.headerTitle}>Bình luận</Text>
      </View>

      {/* Overall Rating */}
      <View style={styles.overallRating}>
        <Text style={styles.overallRatingText}>4.5/5</Text>
        <Rating
          startingValue={4.5}
          readonly
          imageSize={20}
          style={{ marginVertical: 10 }}
        />
        <Text style={styles.totalReviews}>
          {ratingsSummary.totalReviews} đánh giá
        </Text>
      </View>

      {/* Rating Criteria */}
      <View style={styles.ratingCriteria}>
        <View style={styles.criteriaRow}>
          <Text style={styles.criteriaLabel}>Product Quality</Text>
          <ProgressBar
            progress={ratingsSummary.productQuality / 5}
            color="#4CAF50"
            style={styles.progressBar}
          />
          <Text style={styles.criteriaValue}>
            {ratingsSummary.productQuality}/5
          </Text>
        </View>
        <View style={styles.criteriaRow}>
          <Text style={styles.criteriaLabel}>Service Quality</Text>
          <ProgressBar
            progress={ratingsSummary.serviceQuality / 5}
            color="#FF9800"
            style={styles.progressBar}
          />
          <Text style={styles.criteriaValue}>
            {ratingsSummary.serviceQuality}/5
          </Text>
        </View>
        <View style={styles.criteriaRow}>
          <Text style={styles.criteriaLabel}>Delivery Quality</Text>
          <ProgressBar
            progress={ratingsSummary.deliveryQuality / 5}
            color="#2196F3"
            style={styles.progressBar}
          />
          <Text style={styles.criteriaValue}>
            {ratingsSummary.deliveryQuality}/5
          </Text>
        </View>
      </View>

      {/* Comment List */}
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.commentList}
      />

      {/* Add Comment Section (Initially hidden) */}
      {showAddComment && (
        <View style={styles.addCommentContainer}>
          <Text style={styles.addCommentTitle}>Viết bình luận</Text>

          {/* Rating for 3 criteria */}
          <View style={styles.ratingCriteria}>
            <Text style={styles.criteriaLabel}>Product Quality</Text>
            <Rating
              startingValue={newRating}
              onFinishRating={(rating) => setNewRating(rating)}
              imageSize={24}
              style={styles.ratingStars}
            />
            <Text style={styles.criteriaLabel}>Service Quality</Text>
            <Rating
              startingValue={newRating}
              onFinishRating={(rating) => setNewRating(rating)}
              imageSize={24}
              style={styles.ratingStars}
            />
            <Text style={styles.criteriaLabel}>Delivery Quality</Text>
            <Rating
              startingValue={newRating}
              onFinishRating={(rating) => setNewRating(rating)}
              imageSize={24}
              style={styles.ratingStars}
            />
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Nhập bình luận của bạn..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddComment}
          >
            <Text style={styles.submitButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Button to toggle the visibility of the add comment section */}
      {!showAddComment && (
        <TouchableOpacity
          style={styles.addCommentButton}
          onPress={() => setShowAddComment(true)}
        >
          <Text style={styles.addCommentButtonText}>Thêm Bình Luận</Text>
        </TouchableOpacity>
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
  overallRating: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  overallRatingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  totalReviews: {
    color: "#777",
  },
  ratingCriteria: {
    marginTop: 20,
    width: "100%",
  },
  criteriaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  criteriaLabel: {
    flex: 2,
    fontSize: 14,
    color: "#333",
  },
  progressBar: {
    width: 200, // Fixed width
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  criteriaValue: {
    flex: 1,
    fontSize: 14,
    textAlign: "right",
    color: "#555",
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
  commentName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  commentText: {
    marginVertical: 5,
    fontSize: 14,
    color: "#333",
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
  },
  addCommentContainer: {
    padding: 15,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 2,
  },
  addCommentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ratingStars: {
    marginVertical: 5,
  },
  commentInput: {
    height: 80,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addCommentButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addCommentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CommentScreen;
