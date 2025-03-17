

import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StackLayout = () => {
  return (
    <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
</Stack>
  );
}

export default StackLayout;
