import React from "react";
import { ImageBackground } from "react-native";
import { styled } from "tamagui";

const BannerContainer = styled(ImageBackground, {
  height: 150,
  marginHorizontal: -6,
});

const Banner: React.FC = () => {
  const banner = { image: require("../../../assets/images/herobanner.jpg") };
  return <BannerContainer source={banner.image} resizeMode="cover" />;
};

export default Banner;
