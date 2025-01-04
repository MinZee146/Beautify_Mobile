import React from "react";
import { Card, Text, Image, Button, XStack, YStack } from "tamagui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Product from "@/app/enities/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card
      elevate
      elevation={2}
      width="100%"
      height={120}
      borderRadius={12}
      backgroundColor="#fffff7"
    >
      <XStack height="100%" gap={12} padding={10}>
        {/* Product Image */}
        <Image
          source={{ uri: product.image }}
          width={100}
          height="100%"
          borderRadius={8}
        />

        {/* Product Details */}
        <YStack flex={1} justifyContent="space-between" padding={5}>
          {/* Product Name */}
          <YStack gap={6}>
            <Text fontSize={14} fontWeight="700" numberOfLines={2}>
              {name}
            </Text>

            {/* Rating and Reviews */}
            <XStack alignItems="center" gap={6}>
              <AntDesign name="star" size={14} color="#FFD700" />
              <Text fontSize={14} color="#6E6E6E">
                {product.rating} ({product.reviews} review
                {product.reviews > 1 ? "s" : ""})
              </Text>
            </XStack>
          </YStack>

          {/* Price and Add to Cart Button */}
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={18} fontWeight="600" color="#FF6D00">
              ${product.price}
            </Text>
            <Button
              chromeless
              icon={
                <FontAwesome5 name="shopping-cart" size={18} color="black" />
              }
            />
          </XStack>
        </YStack>
      </XStack>
    </Card>
  );
};

export default ProductCard;
