import React from "react";
import { View } from "react-native";
import { Text, styled, Image } from "tamagui";

const BannerContainer = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 20,
  backgroundColor: "#060606",
});

const TextContainer = styled(View, {
  flex: 1,
});

const TitleText = styled(Text, {
  fontSize: 24,
  fontWeight: "700",
  color: "#FFC0CB",
  marginBottom: 10,
  textAlign: "left",
});

const ImageContainer = styled(View, {
  flex: 1,
  alignItems: "flex-end",
});

const BannerImage = styled(Image, {
  width: 150,
  height: 150,
  borderRadius: 20,
});

const Banner: React.FC = () => {
  return (
    <BannerContainer>
      <TextContainer>
        <TitleText>
          "Feel Beautiful,{"\n"}
          {"\t"}
          {" "}Be Confident."
        </TitleText>
      </TextContainer>
      <ImageContainer>
        <BannerImage
          source={require("../../assets/images/model.jpg")}
          resizeMode="cover"
        />
      </ImageContainer>
    </BannerContainer>
  );
};

export default Banner;
