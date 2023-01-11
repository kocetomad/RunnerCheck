import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Represents the saved button inside the main camera view, opens the "saved" bottom sheet.
 * @constructor
 * @param {object {text,data}} setBottomSheetState - An object of parameters that are passed on to the bottom sheet, "text" - refers to the header text, "data" is the contents of the bottom sheet
 * @param {stylesheet object} stylesheet - Stylesheet passed on from the MainCamera View.
 */
const FavouritesButton = ({ stylesheet, setBottomSheetState }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        /** This function fetches a list of all saved cars */
        (async function () {
          try {
            keys = await AsyncStorage.getAllKeys();
            return await AsyncStorage.multiGet(keys);
          } catch (e) {}
        })().then((keys) => {
          console.log(keys);
          setBottomSheetState({
            text: "Saved vehicles:",
            data: keys,
          });
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
        <Text style={{ color: "#f4717f", fontSize: 14 }}>Saved </Text>
        <Icon name="star-outline" size={25} color="#f4717f" />
      </View>
    </TouchableOpacity>
  );
};

export default FavouritesButton;
