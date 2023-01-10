import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useState, useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import CarModelCameraView from "../screens/CarModelCameraView";
import CarDetailsView from "../screens/CarDetails";
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f4717f",
    card: "#f4717f",
  },
};
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

//Wraps the Stack Nav for the Home screen
function MainStackNav({ route }) {
  const Stack = createStackNavigator();
  const [selectedCar, setSelectedCar] = useState({model:"",reg:""});

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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNav;
