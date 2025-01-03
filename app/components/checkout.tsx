import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
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
    const price = parseFloat(product.price.slice(1));
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
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={
            <>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Checkout</Text>
              </View>

              {/* User Info */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Information</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={userInfo.name}
                  onChangeText={(text) =>
                    setUserInfo({ ...userInfo, name: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={userInfo.address}
                  onChangeText={(text) =>
                    setUserInfo({ ...userInfo, address: text })
                  }
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
                  style={styles.cardButton}
                >
                  {voucher ? (
                    <View style={styles.rowCenter}>
                      <Image
                        source={{ uri: voucher.logo }}
                        style={styles.voucherLogo}
                      />
                      <Text style={styles.voucherText}>
                        {voucher.code} - {voucher.discount}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.placeholderText}>Select a voucher</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Payment Method */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <TouchableOpacity
                  onPress={() => setIsPaymentModalVisible(true)}
                  style={styles.cardButton}
                >
                  <Text style={styles.placeholderText}>{paymentMethod}</Text>
                </TouchableOpacity>
              </View>

              {/* Order Summary */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
              </View>
            </>
          }
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productRow}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  {item.price} x {item.quantity}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Footer Button */}
        <View style={styles.footer}>
          <Text style={styles.summaryText}>
            Total: $
            {(voucher
              ? totalAmount -
                (totalAmount * parseInt(voucher.discount, 10)) / 100
              : totalAmount
            ).toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={handlePlaceOrder}
            style={styles.placeOrderButton}
          >
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>

        {/* Voucher Modal */}
        <Modal
          visible={isVoucherModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setIsVoucherModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
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

        {/* Payment Method Modal */}
        <Modal
          visible={isPaymentModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setIsPaymentModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
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
                      style={styles.paymentMethodImage}
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
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  cardButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  voucherLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  voucherText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  productRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  placeOrderButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: "#ff6347",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentMethodImage: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },
});

export default CheckoutScreen;
