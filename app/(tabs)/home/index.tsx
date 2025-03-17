import react, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { useThemeColor } from "@/hooks/useThemeColor";

import { useColorScheme } from "@/hooks/useColorScheme";
import { CoffeeItem, fetchCoffees } from "@/models/CoffeeModel";
import CoffeeListItem from "@/components/home/CoffeeItem";
import { Link, router, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const checkAuth = async () => {
    const userLoggedIn = false;
    if (!userLoggedIn) {
      router.replace("/signin");
    }
  };
  checkAuth();
}, []);


interface BannerProps {
  safeAreaInsets: { top: number };
  searchText: string;
  setSearchText: (text: string) => void;
}

const Banner = ({ safeAreaInsets, searchText, setSearchText }: BannerProps) => {
  return (
    <View style={[styles.banner, { paddingTop: safeAreaInsets.top + 12 }]}>
      <View style={styles.infoContainer}>
        <View style={{ alignItems: "flex-start", gap: 4 }}>
          <Text style={styles.locationTitleText}>Location</Text>
          <Text style={styles.locationText}>Kathmandu, Nepal</Text>
        </View>
        <Image source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }} style={styles.profileImage} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={"#9B9B9B"}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
    </View>
    
  );
};

export default function HomeScreen() {
  const { colors } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  // States
  const [searchText, setSearchText] = useState("");
  const [coffeeItems, setCoffeeItems] = useState<CoffeeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCoffeeItems, setFilteredCoffeeItems] = useState<CoffeeItem[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCoffees();
      if (result.success && result.data) {
        setCoffeeItems(result.data);
        setFilteredCoffeeItems(result.data);
      } else {
        console.error("Error fetching data:", result.error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredCoffeeItems(coffeeItems);
    } else {
      const filtered = coffeeItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCoffeeItems(filtered);
    }
  }, [searchText, coffeeItems]);

  const renderItem = ({ item, index }: { item: CoffeeItem; index: number }) => {
    return (
      <View
        style={{
          marginLeft: index % 2 === 0 ? 0 : 10,
        }}
      >
        <Link
          href={{
            pathname: "/detail/CoffeeDetailScreen",
            params: {
              id: item._id,
              name: item.name,
              description: item.description,
              price: item.price,
              region: item.region,
              roastLevel: item.roast_level,
              imageUrl: item.image_url,
            },
          }}
        >
          <CoffeeListItem {...item} />
        </Link>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Banner
        safeAreaInsets={safeAreaInsets}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <FlatList
        data={filteredCoffeeItems}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item, index }) => renderItem({ item, index })}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 100,
        }}
      />
      <View style={styles.promoBanner}>
                <LinearGradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,1)"]} style={styles.promoOverlay} />
                <Text style={styles.promoTag}>Promo</Text>
                <Text style={styles.promoText}>Buy one get one Free</Text>
            </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  banner: {
    flex: 1,
    backgroundColor: "#1D1D1D",
    height: 230,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  locationContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  locationTitleText: {
    fontSize: 14,
    fontWeight: "light",
    color: "white",
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  profileImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 16,
  },

  // Style for search field
  searchContainer: {
    backgroundColor: "#313131",
    height: 50,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  searchInput: {
    flex: 1,
    color: "white",
    paddingHorizontal: 10,
  },
  promoBanner: { margin: 20, height: 120, backgroundColor: "#333", borderRadius: 10, padding: 15, justifyContent: "flex-end",zIndex:2,position:"absolute", top: 150, left: 0, right: 0 },
  promoOverlay: { ...StyleSheet.absoluteFillObject, borderRadius: 10 },
  promoTag: { color: "white", backgroundColor: "#D17842", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5, alignSelf: "flex-start", marginBottom: 5 },
  promoText: { color: "white", fontSize: 18, fontWeight: "bold" },

});
