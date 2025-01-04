import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import { Card, Text, Button, YStack, XStack } from "tamagui";

interface PopularCardProps {
  image: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
}

const PopularCard: React.FC<PopularCardProps> = ({
  image,
  name,
  price,
  rating,
  reviews,
}) => {
  return (
    <Card
      margin={3}
      elevate
      elevation={2}
      borderRadius={16}
      width={140}
      space={8}
      backgroundColor="#fffff7"
    >
      {/* Hình ảnh */}
      <Card.Header padding={0}>
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 140,
            borderRadius: 16,
          }}
          resizeMode="cover"
        />
      </Card.Header>

      {/* Nội dung */}
      <YStack padding={8} space={8}>
        {/* Tên sản phẩm */}
        <Text
          fontWeight="700"
          fontSize={14}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name}
        </Text>

        {/* Giá và Đánh giá */}
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="600" fontSize={14} color="#FF6D00">
            {price}$
          </Text>
          <AntDesign name="star" size={16} color="#FFD700" />
          <Text fontSize={12} color="#6E6E6E">
            {rating} ({reviews})
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
};

export default PopularCard;
