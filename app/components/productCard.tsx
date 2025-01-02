import React from "react";
import { Card, Text, Image, Button, XStack, YStack } from "tamagui";
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
    <Card
      bordered
      elevate
      backgroundColor="$background"
      width={280}
      borderRadius="$4"
    >
      <Card.Header padded>
        <Image
          source={{ uri: image }}
          width="100%"
          height={200}
          borderRadius="$4"
          resizeMode="cover"
        />
      </Card.Header>

      <Card.Footer padded>
        <YStack gap={8}>
          {/* Product Name */}
          <Text fontSize={16} fontWeight="700" textAlign="center">
            {name}
          </Text>

          {/* Rating and Reviews */}
          <XStack justifyContent="center" alignItems="center" gap={6}>
            <AntDesign name="star" size={18} color="#FFD700" />
            <Text fontSize={14} color="$colorSecondary">
              {rating} ({reviews} review{reviews > 1 ? "s" : ""})
            </Text>
          </XStack>

          {/* Price and Add to Cart Button */}
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={18} fontWeight="600" color="$primary">
              ${price}
            </Text>
            <Button
              circular
              size={6}
              backgroundColor="$primary"
              icon={
                <FontAwesome5 name="shopping-cart" size={20} color="white" />
              }
            />
          </XStack>
        </YStack>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
