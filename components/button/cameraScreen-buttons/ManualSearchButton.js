import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

/**
 * Represents the manual search bar button inside the main camera view.
 * @constructor
 * @param {stylesheet object} stylesheet - Stylesheet passed on from the MainCamera View.
 * @param {object {text,data}} setBottomSheetState - An object of parameters that are passed on to the bottom sheet, "text" - refers to the header text, "data" is the contents of the bottom sheet
 */
const ManualSearchButton = ({ stylesheet, setBottomSheetState }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        setBottomSheetState({
          text: "Manual Search:",
        });
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
        <Text style={{ color: "#f4717f", fontSize: 14 }}>Manual search </Text>
        <Icon name="search" size={25} color="#f4717f" />
      </View>
    </TouchableOpacity>
  );
};

export default ManualSearchButton;
