import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Signin() {
  const insets = useSafeAreaInsets(); 

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ImageBackground
        source={images.bgImage}
        style={styles.imageContainer}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
          locations={[0, 0.23]}
          style={styles.gradient}
        />
      </ImageBackground>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>
          Coffee so good, your taste buds will love it.
        </Text>
        <Text style={styles.subtitle}>
          The best grain, the finest roast, the powerful flavor.
        </Text>
        <Pressable
          onPress={() => {
            router.replace("./home");
          }}
          style={styles.googleButton}
        >
          <Ionicons name="logo-google" size={24} color="black" />
          <Text style={styles.googleText}>Continue with Google</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  imageContainer: {
    height: "80%",
    width: "100%",
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 17,
    paddingHorizontal: 40,
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 17,
    paddingHorizontal: 32,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    width: "100%",
  },
  googleText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});
