import * as React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { fetchIssues } from "../../data/Data";

/**
 * Represents the common issues button, inside of the car details tab.
 * @constructor
 * @param {object {text,data}} setBottomSheetState - An object of parameters that are passed on to the bottom sheet, "text" - refers to the header text, "data" is the contents of the bottom sheet
 * @param {string[]} carSpecs - The list of car spec passed on from CarDetails.js.
 */
const CommonIssuesButton = ({ setBottomSheetState, carSpecs }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        setBottomSheetState({
          text: "Loading...",
        });
        /** Opens the bottom sheet and populates it wit the common issues data, formats the data so that it is more readable. */
        fetchIssues(carSpecs[1].split(" ")[1], carSpecs[2].split(" ")[1]).then(
          (processed) => {
            if (processed.answer_box.list !== undefined) {
              setBottomSheetState({
                text: "Common Issues:",
                data: processed.answer_box.list,
                link: [carSpecs[1].split(" ")[1], carSpecs[2].split(" ")[1]],
              });
            } else {
              setBottomSheetState({
                text: "Couldn't find any common issues:",
                link: [carSpecs[1].split(" ")[1], carSpecs[2].split(" ")[1]],
              });
            }
          }
        );
      }}
      style={styles.dvla}
    >
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={{ color: "#e9e3e3", fontSize: 18 }}>Common Issues ⚠️</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dvla: {
    marginHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 2,
    elevation: 5,
    borderRadius: 10,
    padding: 5,
    borderColor: "white",
    backgroundColor: "#f4717f",
  },
});

export default CommonIssuesButton;
