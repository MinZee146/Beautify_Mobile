import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProductCard from "../components/productCard"; // Import ProductCard đã tạo

const HomeScreen = () => {
  const router = useRouter();

  // Danh sách sản phẩm ngẫu nhiên
  const products = [
    {
      name: "Promio Body Lotion",
      image: "https://via.placeholder.com/150",
      price: "29.99",
      rating: 4.5,
      reviews: 120,
    },
    {
      name: "Natural Organ Oil",
      image: "https://via.placeholder.com/150",
      price: "49.99",
      rating: 4.8,
      reviews: 200,
    },
    {
      name: "Skin Oil Serum",
      image: "https://via.placeholder.com/150",
      price: "39.99",
      rating: 4.7,
      reviews: 180,
    },
    {
      name: "Face Cream",
      image: "https://via.placeholder.com/150",
      price: "19.99",
      rating: 4.3,
      reviews: 80,
    },
    {
      name: "Moisturizing Lotion",
      image: "https://via.placeholder.com/150",
      price: "24.99",
      rating: 4.6,
      reviews: 95,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Feather name="menu" size={24} color="black" />
        <AntDesign name="search1" size={24} color="black" />
        <Ionicons name="bag-handle-outline" size={24} color="black" />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {["Kids", "Women", "Cream", "Face Wash", "Troll", "Test"].map(
          (category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                index === 1 && styles.activeCategory,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  index === 1 && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Popular Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular</Text>
      </View>

      {/* Recent Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Products</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            image={product.image}
            price={product.price}
            rating={product.rating}
            reviews={product.reviews}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categories: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "flex-start",
    paddingHorizontal: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeCategory: { backgroundColor: "#4CAF50" },
  categoryText: { color: "#555", fontSize: 14 },
  activeCategoryText: { color: "#fff", fontWeight: "bold" },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
});

export default HomeScreen;
