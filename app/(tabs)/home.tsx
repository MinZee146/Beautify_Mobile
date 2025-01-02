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
import ProductCard from "../components/productCard";
import { XStack } from "tamagui";

const HomeScreen = () => {
  const router = useRouter();

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
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.header}>
          <Feather name="menu" size={24} color="black" />
          <XStack gap={16}>
            <AntDesign name="search1" size={24} color="black" />
            <Ionicons name="bag-handle-outline" size={24} color="black" />
          </XStack>
        </View>

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
      </View>

      {/* Product List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Best Sellers</Text>
        <View style={styles.productList}>
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  stickyHeader: {
    backgroundColor: "#fff",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    zIndex: 1000,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categories: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
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
  scrollContainer: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    display: "flex",
    rowGap: 10,
  },
});

export default HomeScreen;
