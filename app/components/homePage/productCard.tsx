import React from "react";
import { Card, Text, Image, Button, XStack, YStack } from "tamagui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Product from "@/app/enities/product";
import { useRouter } from "expo-router";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/components/productPage/productDetail");
  };

  return (
    <Card
      elevate
      elevation={2}
      width="100%"
      height={120}
      borderRadius={12}
      backgroundColor="#fffff7"
      onPress={handlePress}
    >
      <XStack height="100%" gap={12} padding={10}>
        {/* Product Image */}
        <Image
          source={product.image}
          width={100}
          height="100%"
          borderRadius={8}
        />

        {/* Product Details */}
        <YStack flex={1} justifyContent="space-between" padding={5}>
          {/* Product Name */}
          <YStack gap={4}>
            <Text fontSize={15} fontWeight="700" numberOfLines={2}>
              {product.name}
            </Text>

            {/* Rating and Reviews */}
            <XStack alignItems="center" gap={6}>
              <AntDesign name="star" size={15} color="#FFD700" />
              <Text fontSize={13} color="#888888" fontWeight={"bold"}>
                {product.rating} ({product.reviews} review
                {product.reviews > 1 ? "s" : ""})
              </Text>
            </XStack>
          </YStack>

          {/* Price and Add to Cart Button */}
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={16} fontWeight="bold" color="#FF6D00">
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
