import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Image, View, Text, XStack } from "tamagui";

const OrderListScreen = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/components/orderPage/orderDetail");
  };

  const orders = [
    {
      id: "1",
      date: "2025-01-01",
      total: "$109.97",
      status: "Delivering",
      products: [
        {
          id: "1",
          name: "Promio Body Lotion",
          price: "$29.99",
          quantity: 2,
          image: require("../../assets/images/Product/P1.webp"),
        },
        {
          id: "2",
          name: "Natural Organ Oil",
          price: "$49.99",
          quantity: 1,
          image: require("../../assets/images/Product/P2.webp"),
        },
      ],
    },
    {
      id: "2",
      date: "2025-01-02",
      total: "$144.96",
      status: "Preparing",
      products: [
        {
          id: "1",
          name: "Skin Oil Serum",
          price: "$39.99",
          quantity: 3,
          image: require("../../assets/images/Product/P3.webp"),
        },
        {
          id: "2",
          name: "Face Cream",
          price: "$19.99",
          quantity: 2,
          image: require("../../assets/images/Product/P4.webp"),
        },
        {
          id: "3",
          name: "Moisturizing Lotion",
          price: "$24.99",
          quantity: 1,
          image: require("../../assets/images/Product/P5.webp"),
        },
      ],
    },
  ];

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      date: string;
      total: string;
      status: string;
      products: {
        id: string;
        name: string;
        price: string;
        quantity: number;
        image: any;
      }[];
    };
  }) => {
    return (
      <TouchableOpacity style={styles.orderItem} onPress={handlePress}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text style={styles.orderDate}>Date: {item.date}</Text>
          <Text
            style={[
              styles.orderStatus,
              item.status === "Delivering"
                ? styles.statusDelivering
                : styles.statusPreparing,
            ]}
          >
            {item.status}
          </Text>
        </XStack>
        <Text style={styles.orderTotal}>Total: {item.total}</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={item.products}
          keyExtractor={(product) => product.id}
          renderItem={({ item: product }) => (
            <View paddingVertical={4}>
              <View style={styles.productRow}>
                <Image source={product.image} style={styles.productImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productQuantity}>
                    Qty: {product.quantity}
                  </Text>
                </View>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            </View>
          )}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F6F8" }}>
      <XStack style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
      </XStack>
      <View style={styles.screenContainer}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
  },
  header: {
    padding: 12,
    paddingHorizontal: 20,
    backgroundColor: "#0b0b0b",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#FBFCD4",
  },
  orderItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusDelivering: {
    color: "#32CD32", // Green for delivering
  },
  statusPreparing: {
    color: "#FF8C00", // Orange for preparing
  },
  orderTotal: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  productName: {
    fontSize: 14,
    color: "#555",
  },
  productQuantity: {
    fontSize: 12,
    color: "#888",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
  },
});

export default OrderListScreen;
