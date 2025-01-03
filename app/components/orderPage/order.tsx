import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

const OrderListScreen = () => {
  // Dữ liệu mẫu về các đơn hàng
  const orders = [
    {
      id: "1",
      date: "2025-01-01",
      total: "$120.00",
      status: "Delivered",
      products: [
        { id: "1", name: "Lipstick", quantity: 2, price: "$25.00" },
        { id: "2", name: "Foundation", quantity: 1, price: "$70.00" },
      ],
    },
    {
      id: "2",
      date: "2025-01-02",
      total: "$80.00",
      status: "Pending",
      products: [
        { id: "1", name: "Mascara", quantity: 1, price: "$20.00" },
        { id: "2", name: "Blush", quantity: 2, price: "$30.00" },
      ],
    },
  ];

  const renderItem = ({ item }: { item: { id: string; date: string; total: string; status: string; products: { id: string; name: string; quantity: number; price: string; }[]; } }) => {
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderDate}>Order Date: {item.date}</Text>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
        <Text style={styles.orderTotal}>Total: {item.total}</Text>

        {/* Render danh sách các sản phẩm trong đơn hàng */}
        <FlatList
          data={item.products}
          keyExtractor={(product) => product.id}
          renderItem={({ item: product }) => (
            <View style={styles.productRow}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productQuantity}>x{product.quantity}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  orderItem: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 14,
    marginBottom: 5,
    color: "#FF6347", // Red for status
  },
  orderTotal: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 12,
  },
  productName: {
    fontSize: 14,
    flex: 1,
  },
  productQuantity: {
    fontSize: 14,
    marginRight: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OrderListScreen;
