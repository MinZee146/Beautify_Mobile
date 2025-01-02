import React from "react";
import { Stack, Text, Image, Button, XStack } from "tamagui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

type ProductCardProps = {
  name: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  rating,
  reviews,
}) => {
  return (
    <Stack
      backgroundColor="$background"
      borderRadius={4}
      padding={4}
      shadowColor="$shadow"
      shadowRadius={2}
      gap={3}
      width={250}
    >
      {/* Product Image */}
      <Image
        source={{ uri: image }}
        width={100}
        height={100}
        borderRadius={2}
        resizeMode="cover"
      />

      <XStack justifyContent="space-between" alignItems="center">
        <Stack gap={1}>
          <Text fontSize={4} fontWeight="700">
            {name}
          </Text>
          <XStack alignItems="center" gap={1}>
            <AntDesign name="star" size={24} color="gold" />
            <Text fontSize={3} color="$colorSecondary">
              {rating} ({reviews} review{reviews > 1 ? "s" : ""})
            </Text>
          </XStack>
        </Stack>
      </XStack>

      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={4} fontWeight="600" color="$primary">
          ${price}
        </Text>
        <Button
          size="$3"
          circular
          icon={<FontAwesome5 name="shopping-cart" size={24} color="black" />}
        />
      </XStack>
    </Stack>
  );
};

export default ProductCard;
