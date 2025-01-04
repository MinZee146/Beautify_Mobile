import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";

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
  const [showAddComment, setShowAddComment] = useState(false);

  const calculateRatingsSummary = () => {
    const totalReviews = comments.length;
    const productQuality = 4.5;
    const serviceQuality = 4.0;
    const deliveryQuality = 4.7;
    return { productQuality, serviceQuality, deliveryQuality, totalReviews };
  };

  const ratingsSummary = calculateRatingsSummary();

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
        <Text style={styles.headerTitle}>Bài đánh giá</Text>
      </View>

      {/* Rating Summary and Criteria */}
      <View style={styles.ratingContainer}>
        <View style={styles.overallRatingSection}>
          <Text style={styles.overallRatingText}>4.5</Text>
          <Rating
            startingValue={4.5}
            readonly
            imageSize={20}
            style={{ marginVertical: 5 }}
          />
          <Text style={styles.totalReviews}>653 đánh giá</Text>
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
                    backgroundColor: "#4CAF50", // Màu xanh cho phần đã đánh giá
                  },
                ]}
              />
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      100 - (ratingsSummary.productQuality / 5) * 100
                    }%`,
                    backgroundColor: "#ccc", // Màu xám cho phần chưa đánh giá
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
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      100 - (ratingsSummary.serviceQuality / 5) * 100
                    }%`,
                    backgroundColor: "#ccc",
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
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      100 - (ratingsSummary.deliveryQuality / 5) * 100
                    }%`,
                    backgroundColor: "#ccc",
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
  commentName: {
    fontWeight: "bold",
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
});

export default CommentScreen;
