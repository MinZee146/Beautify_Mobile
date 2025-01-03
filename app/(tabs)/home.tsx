import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ProductCard from "../components/homePage/productCard";
import PopularCard from "../components/homePage/popularCard";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { XStack, Image } from "tamagui";
import Banner from "../components/homePage/banner";
import Category from "../enities/category";
import { useRouter } from "expo-router";

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
      <XStack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={16}
        backgroundColor="#0B0B0B"
      >
        <Image
          source={require("../../assets/images/AppIcon.jpg")}
          width={36}
          height={36}
          borderRadius={12}
        />
        <XStack gap={16}>
          <AntDesign name="search1" size={24} color="#FBFCD4" />
          <TouchableOpacity
            onPress={() => router.push("/components/cartPage/cart")}
          >
            <Ionicons name="bag-handle-outline" size={24} color="#FBFCD4" />
          </TouchableOpacity>
        </XStack>
      </XStack>
      <View style={styles.stickyHeader}>
        <FlatList
          data={Category}
          renderItem={({ item, index }) => (
            <TouchableOpacity
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
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        />
      </View>

      {/* Product List */}
      <ScrollView>
        <Banner />
        <Text style={styles.sectionTitle}>Popular</Text>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <PopularCard
              name={item.name}
              image={item.image}
              price={item.price}
              rating={item.rating}
              reviews={item.reviews}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularList}
        />

        <Text style={styles.sectionTitle}>Products</Text>
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
  container: { flex: 1, backgroundColor: "#FCFCF7" },
  stickyHeader: {
    backgroundColor: "#FCFCF7",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    zIndex: 1000,
  },
  categories: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderWidth: 1.5,
    borderColor: "#116A7B",
  },
  activeCategory: {
    backgroundColor: "#921A40",
    borderWidth: 0,
  },
  categoryText: {
    color: "#555",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  activeCategoryText: { color: "#fff" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    display: "flex",
    rowGap: 10,
  },
  popularList: {
    flexDirection: "row",
    columnGap: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
});

export default HomeScreen;
