import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";

const services = [
  {
    id: "1",
    name: "Facial Treatment",
    description: "Rejuvenate your skin.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Hair Styling",
    description: "Get your perfect hairstyle.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Nail Art",
    description: "Beautiful nail designs.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Body Massage",
    description: "Relax and unwind.",
    image: "https://via.placeholder.com/150",
  },
];

const ServiceList = () => {
  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; description: string; image: string };
  }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for services..."
      />

      {/* Service List */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});

export default ServiceList;
