import React from "react";
import { View, Text, Image, Button } from "tamagui";

const PromoScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000", // Nền đen
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Tiêu đề */}
      <Text
        style={{
          fontSize: 24,
          color: "gold", // Chữ vàng gold
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          lineHeight: 32,
        }}
      >
        isko laga dala{"\n"}to life jinga lala
      </Text>

      {/* Hình ảnh */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginHorizontal: 10,
          }}
        />
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginHorizontal: 10,
          }}
        />
      </View>

      {/* Thông tin */}
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <View
          style={{
            backgroundColor: "orange", // Màu nền cam
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
          }}
        >
          <Text style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}>
            100% Organic
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: "gold",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          We deliver in just 8-10 days worldwide
        </Text>
      </View>

      {/* Nút */}
      <Button
        theme="pink" // Nút màu hồng
        style={{
          marginTop: 20,
          backgroundColor: "#ff69b4", // Màu hồng
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 30,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Shop Now
        </Text>
      </Button>
    </View>
  );
};

export default PromoScreen;
