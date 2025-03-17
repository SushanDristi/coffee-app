import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/signin"); 
    }, 500);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to My App</Text>
      <ActivityIndicator size="large" color="#ffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
