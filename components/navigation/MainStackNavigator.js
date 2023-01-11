import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useState, useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import CarModelCameraView from "../screens/CameraScreen";
import Onboarding from "../screens/OnboardingScreen";
import CarDetailsView from "../screens/CarDetailsScreen";
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f4717f",
    card: "#f4717f",
  },
};
/**
 * Represents the Stack Navigation structure, uses react navigation.
 * @constructor
 * @param {route} route - React navigation route parameters.
 */
function MainStackNav({ route }) {
  const Stack = createStackNavigator();
  const [selectedCar, setSelectedCar] = useState({ model: "", reg: "" });

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator id="nav">
        <Stack.Screen
          id="CameraScreen"
          name="Camera"
          component={CarModelCameraView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Group id="modalGroup" screenOptions={{ presentation: "card" }}>
          <Stack.Screen
            name="Car Details"
            component={CarDetailsView}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Help"
            component={Onboarding}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNav;
