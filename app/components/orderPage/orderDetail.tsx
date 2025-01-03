import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderDetail = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Order Info Section */}
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order ID: 10</Text>
        <Text style={styles.orderDate}>Order Date: 02/01/2025</Text>
        <Text style={styles.expectedDelivery}>
          Expected Delivery: 07/01/2025
        </Text>
      </View>

      {/* Order Status Section */}
      <View style={styles.orderStatus}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <View style={styles.statusRow}>
          {/* Step 1 */}
          <View style={styles.statusStep}>
            <FontAwesome5 name="hourglass-half" size={24} color="green" />
            <Text>Preparing</Text>
          </View>
          {/* Line between */}
          <View style={styles.statusLine}></View>
          {/* Step 2 */}
          <View style={styles.statusStep}>
            <FontAwesome5 name="truck" size={24} color="green" />
            <Text>Delivering</Text>
          </View>
          {/* Line between */}
          <View style={styles.statusLine}></View>
          {/* Step 3 */}
          <View style={styles.statusStep}>
            <FontAwesome5 name="check-circle" size={24} color="green" />
            <Text>Completed</Text>
          </View>
        </View>
      </View>

      {/* Order Items Section */}
      <View style={styles.orderItems}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        <View style={styles.itemRow}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.itemImage}
          />
          <Text>ndsa</Text>
          <Text style={styles.itemPrice}>$10.00</Text>
        </View>
        <View style={styles.itemRow}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.itemImage}
          />
          <Text>update</Text>
          <Text style={styles.itemPrice}>$10.00</Text>
        </View>
      </View>

      {/* Payment Details Section */}
      <View style={styles.paymentDetails}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <Text>Order Price: $20.00</Text>
        <Text>Shipping Fee: $5.00</Text>
        <Text>Voucher (None): - $0</Text>
        <Text style={styles.finalPrice}>Final Price: $25.00</Text>
        <Text>Payment Method: Cash on Delivery</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  orderInfo: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    color: "gray",
  },
  expectedDelivery: {
    fontSize: 14,
    color: "gray",
  },
  orderStatus: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusStep: {
    alignItems: "center",
    width: "25%", // Adjust as needed
  },
  statusLine: {
    flex: 1,
    height: 2, // Thickness of the line
    backgroundColor: "green", // Color of the line
    marginHorizontal: 8, // Spacing around the line
  },
  orderItems: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  paymentDetails: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  finalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    color: "green",
  },
});

export default OrderDetail;
