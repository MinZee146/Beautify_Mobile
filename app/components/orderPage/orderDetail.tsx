import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, View, Text, XStack } from "tamagui";
import { useRouter } from "expo-router";

const OrderDetail = () => {
  const router = useRouter();
  const orderPrice = 59.98;
  const shippingFee = 5.0;
  const voucherDiscount = 0;
  const finalPrice = orderPrice + shippingFee - voucherDiscount;

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F6F8" }}>
      <XStack
        padding={12}
        paddingHorizontal={20}
        backgroundColor="#0b0b0b"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FBFCD4" />
        </TouchableOpacity>
        <Text fontWeight="700" fontSize={18} color="#FBFCD4">
          Detail Order
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/components/cartPage/cart")}
        >
          <Ionicons name="bag-handle-outline" size={24} color="#FBFCD4" />
        </TouchableOpacity>
      </XStack>
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
              <FontAwesome5 name="hourglass-half" size={24} color="#66BB6A" />
              <Text style={styles.statusText}>Preparing</Text>
            </View>
            <View style={styles.statusLine}></View>
            {/* Step 2 */}
            <View style={styles.statusStep}>
              <FontAwesome5 name="truck" size={24} color="#FFA726" />
              <Text style={styles.statusText}>Delivering</Text>
            </View>
            <View style={styles.statusLine}></View>
            {/* Step 3 */}
            <View style={styles.statusStep}>
              <FontAwesome5 name="check-circle" size={24} color="#BDBDBD" />
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>
        </View>

        {/* Order Items Section */}
        <View style={styles.orderItems}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.itemRow}>
            <Image
              source={require("../../../assets/images/Product/P5.webp")}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Face Cream</Text>
              <Text style={styles.itemPrice}>$19.99</Text>
            </View>
          </View>
          <View style={styles.itemRow}>
            <Image
              source={require("../../../assets/images/Product/P3.webp")}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Skin Oil Serum</Text>
              <Text style={styles.itemPrice}>$39.99</Text>
            </View>
          </View>
        </View>

        {/* Payment Details Section */}
        <View style={styles.paymentDetails}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <Text style={styles.paymentText}>
            Order Price: ${orderPrice.toFixed(2)}
          </Text>
          <Text style={styles.paymentText}>
            Shipping Fee: ${shippingFee.toFixed(2)}
          </Text>
          <Text style={styles.paymentText}>
            Voucher (None): - ${voucherDiscount.toFixed(2)}
          </Text>
          <Text style={styles.paymentText}>
            Payment Method: Cash on Delivery
          </Text>
          <Text style={styles.finalPrice}>
            Final Price: ${finalPrice.toFixed(2)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderInfo: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#757575",
  },
  expectedDelivery: {
    fontSize: 14,
    color: "#757575",
  },
  orderStatus: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusStep: {
    alignItems: "center",
    flex: 1,
  },
  statusLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#BDBDBD",
    marginHorizontal: 4,
  },
  statusText: {
    fontSize: 12,
    marginTop: 4,
  },
  orderItems: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  paymentDetails: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  paymentText: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 4,
  },
  finalPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#388E3C",
    marginTop: 8,
  },
});

export default OrderDetail;
