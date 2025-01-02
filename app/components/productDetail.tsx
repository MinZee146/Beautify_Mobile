import React from "react";
import { Stack, Text, Image, Button } from "tamagui";

type ProductDetailsProps = {
  name: string;
  image: string;
  price: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  image,
  price,
}) => {
  return (
    <Stack
      padding="$4"
      alignItems="center"
      backgroundColor="$backgroundSoft"
      borderRadius="$4"
      gap="$4"
    >
      {/* Product Image */}
      <Image
        source={{ uri: image }}
        width={200}
        height={200}
        borderRadius="$4"
        resizeMode="contain"
      />

      {/* Product Info */}
      <Stack alignItems="center" gap="$2">
        <Text fontSize="$5" fontWeight="700">
          {name}
        </Text>
        <Text fontSize="$4" color="$colorSecondary">
          ${price}
        </Text>
      </Stack>

      {/* Shop Now Button */}
      <Button
        size="$4"
        backgroundColor="$primary"
        color="$white"
        borderRadius="$4"
      >
        Shop Now
      </Button>
    </Stack>
  );
};

export default ProductDetails;
