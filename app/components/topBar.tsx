import { XStack, View, Image, Text } from "tamagui";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function TopBar() {
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal={10}
      paddingVertical={10}
      backgroundColor={"#0B0B0B"}
    >
      <XStack gap={8} alignItems="center">
        <Image
          source={require("../../assets/images/AppIcon.jpg")}
          width={36}
          height={36}
          borderRadius={12}
        />
        <Text
          fontSize={20}
          fontWeight="bold"
          fontFamily="Poppins-Bold"
          color="#FF748B"
        >
          BEAUTIFY
        </Text>
      </XStack>
      <XStack gap={16}>
        <AntDesign name="search1" size={24} color="#FBFCD4" />
        <Ionicons name="bag-handle-outline" size={24} color="#FBFCD4" />
      </XStack>
    </View>
  );
}
