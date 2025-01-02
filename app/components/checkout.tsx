import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const CheckoutScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const [voucher, setVoucher] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$50",
      image: "https://via.placeholder.com/150",
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: "$30",
      image: "https://via.placeholder.com/150",
      quantity: 1,
    },
  ];

  const vouchers = [
    {
      id: 1,
      code: "VOUCHER10",
      discount: "10%",
      logo: "https://via.placeholder.com/40/FF007F",
    },
    {
      id: 2,
      code: "VOUCHER20",
      discount: "20%",
      logo: "https://via.placeholder.com/40/FF007F",
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      name: "Credit Card",
      image: "https://via.placeholder.com/50/FF0000",
    },
    { id: 2, name: "PayPal", image: "https://via.placeholder.com/50/009CDE" },
    {
      id: 3,
      name: "Apple Pay",
      image: "https://via.placeholder.com/50/000000",
    },
    {
      id: 4,
      name: "Google Pay",
      image: "https://via.placeholder.com/50/4285F4",
    },
  ];

  const totalAmount = products.reduce((total, product) => {
    const price = parseFloat(product.price.slice(1)); // Remove "$" and convert to float
    return total + price * product.quantity;
  }, 0);

  const applyVoucher = (voucher) => {
    setVoucher(voucher);
    setIsVoucherModalVisible(false);
  };

  const handlePlaceOrder = () => {
    console.log("Order placed!");
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setIsPaymentModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Info</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={userInfo.name}
            onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={userInfo.address}
            onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={userInfo.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, phoneNumber: text })
            }
          />
        </View>

        {/* Voucher */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voucher</Text>
          <TouchableOpacity
            onPress={() => setIsVoucherModalVisible(true)}
            style={styles.voucherButton}
          >
            {voucher ? (
              <View style={styles.voucherContent}>
                <Image
                  source={{ uri: voucher.logo }}
                  style={styles.voucherLogo}
                />
                <Text style={styles.voucherText}>
                  {voucher.code} - {voucher.discount}
                </Text>
              </View>
            ) : (
              <Text style={styles.voucherButtonText}>Select Voucher</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            onPress={() => setIsPaymentModalVisible(true)}
            style={styles.paymentButton}
          >
            <Text style={styles.paymentButtonText}>{paymentMethod}</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Order */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productRow}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>
                    {item.price} x {item.quantity}
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Total:</Text>
            <Text style={styles.summaryText}>${totalAmount}</Text>
          </View>
          {voucher && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>
                Discount ({voucher.discount}):
              </Text>
              <Text style={styles.summaryText}>
                -$
                {((totalAmount * parseInt(voucher.discount)) / 100).toFixed(2)}
              </Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Amount to Pay:</Text>
            <Text style={styles.summaryText}>
              $
              {(
                totalAmount -
                (voucher ? (totalAmount * parseInt(voucher.discount)) / 100 : 0)
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.placeOrderButtonContainer}>
        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={styles.placeOrderButton}
        >
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Method Modal */}
      <Modal
        visible={isPaymentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <FlatList
              data={paymentMethods}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePaymentMethodChange(item.name)}
                  style={styles.modalItem}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.paymentIcon}
                  />
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setIsPaymentModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Voucher Modal */}
      <Modal
        visible={isVoucherModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVoucherModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Voucher</Text>
            <FlatList
              data={vouchers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => applyVoucher(item)}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>
                    {item.code} - {item.discount}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setIsVoucherModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  voucherButton: {
    backgroundColor: "#FDF5F7",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF00A0", // Darker pink border color
    borderStyle: "dashed", // Đặt border là kiểu nét đứt
    flexDirection: "row",
    color: "#000000",
  },
  voucherContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  voucherLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  voucherText: {
    fontSize: 16,
    color: "#fff",
  },
  voucherButtonText: {
    fontSize: 16,
    color: "#000", // Chữ màu đen
  },
  paymentButton: {
    backgroundColor: "#e6e6e6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentButtonText: {
    fontSize: 16,
    color: "#555",
  },
  productRow: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginHorizontal: 5,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#777",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
  },
  placeOrderButtonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    padding: 16,
  },
  placeOrderButton: {
    backgroundColor: "#e91e63",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    flexDirection: "row",
    alignItems: "center",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  modalCloseButton: {
    backgroundColor: "#e91e63",
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CheckoutScreen;
