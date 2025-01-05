import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Button, Input, XStack, YStack, Image, Text, View } from "tamagui";

const ProfileScreen = () => {
  return (
    <View backgroundColor="#181840">
      <XStack
        padding={12}
        paddingHorizontal={20}
        backgroundColor="#0b0b0b"
        alignItems="center"
        justifyContent="center"
        borderBottomWidth={1}
      >
        <Text fontWeight="700" fontSize={18} color="#FBFCD4">
          Personal Information
        </Text>
      </XStack>
      <YStack padding={16} space={16}>
        <YStack alignItems="center" marginVertical={20}>
          <Image
            source={require("../../assets/images/AppIcon.jpg")}
            width={80}
            height={80}
            borderRadius={40}
          />
          <Text fontSize={18} marginTop={12} fontWeight="bold" color="#fff">
            NHHien
          </Text>
        </YStack>
      </YStack>
      <View
        borderTopStartRadius={30}
        borderTopEndRadius={30}
        backgroundColor="#fff"
        padding={30}
        gap={16}
        height="100%"
      >
        <YStack>
          <Text fontSize={16} fontWeight="600" color="#333">
            Full Name
          </Text>
          <Input value="Nguyen Hoang Hien" />
        </YStack>

        <YStack>
          <Text fontSize={16} fontWeight="600" color="#333">
            Email
          </Text>
          <Input keyboardType="email-address" value="hien@gmail.com" />
        </YStack>
        <YStack>
          <Text fontSize={16} fontWeight="600" color="#333">
            Date of Birth
          </Text>
          <Input value="1/1/2025" />
        </YStack>
        <YStack>
          <Text fontSize={16} fontWeight="600" color="#333">
            Address
          </Text>
          <Input value="Viet Nam" />
        </YStack>

        <TouchableOpacity activeOpacity={0.8} style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <XStack space={16}>
          <TouchableOpacity activeOpacity={0.8} style={styles.authButton}>
            <Text style={styles.authText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.authButton}>
            <Text style={styles.authText}>Sign out</Text>
          </TouchableOpacity>
        </XStack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: "#ff7777",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  authButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0288D1",
    flex: 1,
  },
  authText: {
    color: "#0288D1",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
