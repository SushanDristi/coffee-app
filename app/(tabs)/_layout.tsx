
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default  () => {
  return (
    <Tabs>
      <Tabs.Screen name='home' options={{ headerShown: false }}/>
      <Tabs.Screen name='fav'   options={{ headerShown: false }}/>
      <Tabs.Screen name='cart' options={{ headerShown: false }}/>
      <Tabs.Screen name='profile'/>

    </Tabs>
  );
}

