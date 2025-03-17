import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
    const insets = useSafeAreaInsets(); 
    
  
  return <View style={{ flex: 1 ,paddingTop: insets.top}}>
    <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="signin" options={{ headerShown: false }} />
  </Stack>;
  </View>
}
