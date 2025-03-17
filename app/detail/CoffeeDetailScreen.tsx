import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CoffeeItem } from "@/models/CoffeeModel";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CoffeeDetailScreen = () => {
  const { id, name, description, price, region, roastLevel, imageUrl } =
    useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState("M");

  const onSizePress = (size: string) => {
    setSelectedSize(size);
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (name) {
      navigation.setOptions({ title: name });
    }
  }, [name, navigation]);

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 30 }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : null}
      <View style={{ marginTop: 20, gap: 4 }}>
        <ThemedText type="title">{name}</ThemedText>
        <ThemedText type="default">{region}</ThemedText>
        <ThemedText type="defaultSemiBold">⭐ 4.8 (239)</ThemedText>
      </View>
      <View
        style={{
          backgroundColor: "#EAEAEA",
          width: "100%",
          height: 1,
          marginVertical: 30,
        }}
      />
      <View>
        <ThemedText type="subtitle">Description</ThemedText>
        <ThemedText type="body">{description}</ThemedText>
      </View>
      <ThemedText type="subtitle" style={{ marginTop: 16 }}>
        Size
      </ThemedText>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Pressable
          onPress={() => onSizePress("S")}
          style={[
            styles.box,
            selectedSize === "S" ? styles.boxHighlight : undefined,
          ]}
        >
          <ThemedText style={selectedSize === "S"?styles.boxText:{...styles.boxText, color:"#333"}}>S</ThemedText>
        </Pressable>
        <Pressable
          onPress={() => onSizePress("M")}
          style={[
            styles.box,
            selectedSize === "M" ? styles.boxHighlight : undefined,
          ]}
        >
          <ThemedText style={selectedSize === "M"?styles.boxText:{...styles.boxText, color:"#333"}}>M</ThemedText>
        </Pressable>
        <Pressable
          onPress={() => onSizePress("L")}
          style={[
            styles.box,
            selectedSize === "L" ? styles.boxHighlight : undefined,
          ]}
        >
          <ThemedText style={selectedSize === ""?styles.boxText:{...styles.boxText, color:"#333"}}>L</ThemedText>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <View>
          <ThemedText style={{ color: "gray" }} type="default">
            Price
          </ThemedText>
          <ThemedText
            style={{ color: "#C67C4E", letterSpacing: 0.5 }}
            type="subtitle"
          >
            ${price}
          </ThemedText>
        </View>
        <Pressable
          style={{
            width: "60%",
            backgroundColor: "#C67C4E",
            paddingVertical: 18,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Buy Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CoffeeDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    paddingTop: 30,
    aspectRatio: 1.6,
    borderRadius: 16,
    resizeMode: "cover",
  },

  box: {
    width: "30%",
    height: 50,
    borderWidth: 1,
    borderColor: "#DEDEDE",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    textAlign: "center",
  },
  boxHighlight: {
    backgroundColor: "#C67C4E",
    borderColor: "#FFF5EE",
  },
});
