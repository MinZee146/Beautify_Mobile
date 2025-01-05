import Product from "@/app/enities/product";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { Card, Text, YStack, XStack } from "tamagui";

interface PopularCardProps {
  product: Product;
}

const PopularCard = ({ product }: PopularCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/components/productPage/productDetail");
  };

  return (
    <Card
      margin={3}
      elevate
      elevation={2}
      borderRadius={16}
      width={140}
      space={8}
      backgroundColor="#fffff7"
      onPress={handlePress}
    >
      {/* Hình ảnh */}
      <Card.Header padding={0}>
        <Image
          source={product.image}
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
          {product.name}
        </Text>

        {/* Giá và Đánh giá */}
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="600" fontSize={14} color="#FF6D00">
            {product.price}$
          </Text>
          <AntDesign name="star" size={16} color="#FFD700" />
          <Text fontSize={12} color="#6E6E6E">
            {product.rating} ({product.reviews})
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
};

export default PopularCard;
