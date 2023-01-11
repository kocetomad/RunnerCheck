import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import DeleteButton from "../button/cameraScreen-buttons/DeleteButton";

/**
 * Represents the Favourite/Saved Card view inside of the Saved tab in the Camera View.
 * @constructor
 * @param {object {text,data}} setBottomSheetState - An object of parameters that are passed on to the bottom sheet, "text" - refers to the header text, "data" is the contents of the bottom sheet
 * @param {string} reg - the rigstration number of the selected car.
 */
const FavouriteCard = ({ reg, setBottomSheetState }) => {
  const navigation = useNavigation();
  let width = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Car Details", { regNum: reg[0] });
      }}
      style={styles.container}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={{ fontSize: 28 }}>{reg[0]}</Text>
          </View>
          <View style={styles.mode}>
            <Text style={{ fontSize: 20 }}>{reg[1]}</Text>
          </View>
        </View>
        <DeleteButton
          selected={reg[0]}
          setBottomSheetState={setBottomSheetState}
        ></DeleteButton>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowRadius: 6,
    shadowOpacity: 0.4,
    shadowColor: "black",
    elevation: 10,
    padding: 10,
    borderTopLeftRadius: 15,
    backgroundColor: "#ffcd00",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1, //Centered vertically
  },
  mode: {
    padding: 10,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1, //Centered vertically
  },
  container: {
    flexDirection: "column",
  },
});
export default FavouriteCard;
