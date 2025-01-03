import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker

const ServiceDetail = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    appointmentDate: new Date(), // Lưu ngày mặc định
    serviceName: "Service 4",
    totalPrice: "$100",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const service = {
    name: "Service 4",
    price: "$100",
    description:
      "This is the full description of the service. It provides detailed information about the service, its features, and benefits. You can click 'See more' to read further or 'See less' to collapse it.",
    image: "https://via.placeholder.com/500x300",
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleBookNow = () => {
    setModalVisible(true);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, appointmentDate: selectedDate });
    }
  };

  const handleSubmit = () => {
    setModalVisible(false);
    alert(
      `Booking Confirmed for ${
        formData.name
      } on ${formData.appointmentDate.toDateString()}!`
    );
  };

  return (
    <View style={styles.container}>
      {/* Hình ảnh ở trên */}
      <Image source={{ uri: service.image }} style={styles.image} />

      {/* Phần chi tiết dịch vụ */}
      <ScrollView style={styles.detailContainer}>
        <View style={styles.row}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.servicePrice}>{service.price}</Text>
        </View>
        <Text style={styles.description}>
          {showFullDescription
            ? service.description
            : `${service.description.substring(0, 100)}...`}
        </Text>
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.seeMore}>
            {showFullDescription ? "See less" : "See more"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Nút "Book Now" cố định ở dưới */}
      <View style={styles.buttonContainer}>
        <Button title="Book Now" onPress={handleBookNow} color="#1E90FF" />
      </View>

      {/* Modal Form */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange("phoneNumber", value)}
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text style={styles.datePickerText}>
                {formData.appointmentDate
                  ? formData.appointmentDate.toDateString()
                  : "Select Date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.appointmentDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Text style={styles.readOnlyField}>
              Service Name: {formData.serviceName}
            </Text>
            <Text style={styles.readOnlyField}>
              Total Price: {formData.totalPrice}
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#FF6347"
              />
              <Button title="Confirm" onPress={handleSubmit} color="#1E90FF" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  detailContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  seeMore: {
    color: "#1E90FF",
    fontWeight: "bold",
    marginTop: 8,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  readOnlyField: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default ServiceDetail;
