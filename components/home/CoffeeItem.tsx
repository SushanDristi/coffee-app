import { CoffeeItem } from "@/models/CoffeeModel";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

const CoffeeListItem = (item: CoffeeItem) => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <ThemedView
      style={[styles.itemContainer, { width: (screenWidth - 50) / 2 }]}
      key={item.id}
    >
      <View>
        <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      </View>
      <View style={styles.itemContent}>
        <ThemedText style={styles.itemName}>{item.name}</ThemedText>
        <ThemedText style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </ThemedText>
        <ThemedText style={styles.itemPrice}>
          ${item.price.toFixed(2)}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default CoffeeListItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
    height: 270,
    flexDirection: "column",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 16,
  },
  itemContent: {
    padding: 8,
    gap: 4,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "semibold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
  },
});
