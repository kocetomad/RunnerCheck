import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

/**
 * Represents the help button inside the main camera view, opens the help tab.
 * @constructor
 * @param {stylesheet object} stylesheet - Stylesheet passed on from the MainCamera View.
 */
const HelpButton = ({ stylesheet }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Help", { nav: "true" });
      }}
      style={stylesheet}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "#f4717f", fontSize: 14 }}>Help</Text>
        <Icon name="help-outline" size={25} color="#f4717f" />
      </View>
    </TouchableOpacity>
  );
};

export default HelpButton;
