import React from "react";
import { ImageBackground } from "react-native";
import { Text, styled } from "tamagui";
import HeroBanner from "../../../assets/images/herobanner.jpg";
//khs dong nay bi loi

const BannerContainer = styled(ImageBackground, {
  height: 150,
});

const Banner: React.FC = () => {
  return <BannerContainer source={HeroBanner} resizeMode="cover" />;
};

export default Banner;
