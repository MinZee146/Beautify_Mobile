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
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
const CheckoutScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const [voucher, setVoucher] = useState<{
    id: number;
    code: string;
    discount: string;
    logo: string;
  } | null>(null);
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

  const applyVoucher = (voucher: {
    id: number;
    code: string;
    discount: string;
    logo: string;
  }) => {
    setVoucher(voucher);
    setIsVoucherModalVisible(false);
  };

  const handlePlaceOrder = () => {
    console.log("Order placed!");
  };

  const handlePaymentMethodChange = (method: React.SetStateAction<string>) => {
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
                <View style={styles.rowBetween}>
                  <Text style={styles.sectionTitle}>Pickup Location</Text>

                  <TouchableOpacity
                    onPress={() => console.log("Change user info")}
                  >
                    <Text style={styles.changeButton}>Change</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.userInfoContainer}>
                  <Entypo
                    name="location-pin"
                    size={24}
                    color="pink"
                    style={styles.icon}
                  />
                  <View style={styles.userInfoText}>
                    <Text style={styles.userName}>
                      {userInfo.name || "Naturo Sunnyvale"}
                    </Text>
                    <Text style={styles.userAddress}>
                      {userInfo.address ||
                        "123 Sunnyvale Road\nGreenfield, QLD 4567"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Voucher */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Redeem Your Reward</Text>
                <TouchableOpacity
                  onPress={() => setIsVoucherModalVisible(true)}
                  style={styles.cardButton}
                >
                  <MaterialIcons name="discount" size={24} color="#CF2C4A" />
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
                  style={styles.paymentMethodButton}
                >
                  <View style={styles.rowLeft}>
                    <Entypo
                      name="paypal"
                      size={24}
                      color="blue"
                      style={styles.icon}
                    />
                    <Text style={styles.paymentMethodText}>
                      ****-****-****-1234
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => console.log("Change payment method")}
                  >
                    <Text style={styles.changeText}>Change</Text>
                  </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: "#EDB4BE",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#FDF5F7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
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
    color: "#001303",
  },
  placeholderText: {
    fontSize: 16,
    color: "#001303",
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
    backgroundColor: "#FF007F",
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF007F",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-start", // Căn dòng trên cùng theo biểu tượng
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Hiệu ứng nổi trên Android
  },
  userInfoText: {
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userAddress: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: "#555",
  },
  paymentMethodButton: {
    flexDirection: "row", // Sắp xếp các phần tử theo hàng
    justifyContent: "space-between", // Đẩy nội dung 2 đầu
    alignItems: "center", // Căn giữa theo chiều dọc
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center", // Căn giữa icon và text
  },
  paymentMethodText: {
    fontSize: 18,
    color: "#333",
  },
  changeText: {
    fontSize: 16,
    color: "#FF007F", // Màu hồng cho nút Change
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
