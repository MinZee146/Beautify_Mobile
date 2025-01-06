import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import ProductCard from "./productCard";
import PopularCard from "./popularCard";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { XStack, Image, View, Text, ScrollView } from "tamagui";
import Banner from "./banner";
import { useRouter } from "expo-router";
import { sampleProducts } from "../../enities/product";
import { sampleCategories } from "../../enities/category";

const HomeScreen = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(-1);

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
          source={require("../../../assets/images/AppIcon.jpg")}
          width={36}
          height={36}
          borderRadius={12}
        />
        <XStack gap={16}>
          <AntDesign name="search1" size={24} color="#FBFCD4" />
          <TouchableOpacity
            onPress={() => router.push("/components/cartPage/cart")}
          >
            <Ionicons name="cart-outline" size={24} color="#FBFCD4" />
          </TouchableOpacity>
        </XStack>
      </XStack>
      <View style={styles.stickyHeader}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={sampleCategories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                activeIndex === index && styles.activeCategory, // So sánh với activeIndex
              ]}
              onPress={() => setActiveIndex(index)} // Cập nhật trạng thái
            >
              <Text
                style={[
                  styles.categoryText,
                  activeIndex === index && styles.activeCategoryText, // So sánh với activeIndex
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          contentContainerStyle={styles.categories}
        />
      </View>

      {/* Product List */}
      <ScrollView>
        <Banner />
        <View paddingHorizontal={16}>
          <Text style={styles.sectionTitle}>Popular</Text>
          <FlatList
            style={{
              paddingBottom: 8,
              paddingLeft: 5,
              paddingTop: 3,
              paddingRight: 5,
            }}
            data={sampleProducts}
            renderItem={({ item }) => <PopularCard product={item} />}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularList}
          />

          <Text style={styles.sectionTitle}>Products</Text>
          <View style={styles.productList}>
            {sampleProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FCFCF7" },
  stickyHeader: {
    backgroundColor: "#E3D7CB",
    paddingVertical: 12,
    zIndex: 1000,
  },
  categories: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#FCFCF7",
    borderWidth: 1.5,
    borderColor: "#272B2E",
  },
  activeCategory: {
    backgroundColor: "#272B2E",
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
    marginVertical: 12,
    color: "#272B2E",
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
  },
});

export default HomeScreen;
