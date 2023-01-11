import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
/**
 * Represents the registration plate card inside of the main camera view.
 * @constructor
 * @param {string} reg - the resgistration number detected by Vision AI.
 * @param {state} regNumbers - registration numbers state variable.
 * @param {setState} setBottomSheetState - bottom sheet state setter.
 * @param {state} bottomSheetState - bottom sheet state variable.
 */
const NumberPlateCard = ({ reg }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Car Details", { regNum: reg });
      }}
    >
      <View style={styles.card}>
        <Text style={{ fontSize: 30 }}>{reg}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.4,
    padding: 10,
    marginRight: 5,
    elevation: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#ffcd00",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1, //Centered vertically
  },
  tinyLogo: {
    flex: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default NumberPlateCard;
