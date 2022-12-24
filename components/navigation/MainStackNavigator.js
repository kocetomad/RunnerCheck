import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CarModelCameraView from "../screens/CarModelCameraView";
import CarDetailsView from "../screens/CarDetails";
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4F8EF7",
    card: "#4F8EF7",
  },
};

//Wraps the Stack Nav for the Home screen
function MainStackNav() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer theme={MyTheme}>

    <Stack.Navigator id="nav"
    screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        id="CameraScreen"
        name="Camera"
        component={CarModelCameraView}
      />
      <Stack.Group id="modalGroup" screenOptions={{ presentation: "card" }}>
        <Stack.Screen name="Car Details" component={CarDetailsView} />
      </Stack.Group>
    </Stack.Navigator>
    </NavigationContainer>

  );
}

export default MainStackNav;
