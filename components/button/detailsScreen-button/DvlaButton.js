import * as React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { fetchDvlaData } from "../../data/Data";
import { objToArray } from "../../data/Data";

/**
 * Represents the DVLA button inside of the car details view.
 * @constructor
 * @param {object {text,data}} setBottomSheetState - An object of parameters that are passed on to the bottom sheet, "text" - refers to the header text, "data" is the contents of the bottom sheet
 * @param {string} reg - the rigstration number of the selected car.
 */
const DvlaButton = ({ setBottomSheetState, reg }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        setBottomSheetState({
          text: "Loading...",
        });
        /** Feteches official DVLA data from the uk.gov DVLA API, parses the results and passes them to the bottom sheet. */
        fetchDvlaData(reg).then((processed) => {
          let parsed = JSON.parse(JSON.stringify(processed));
          parsed = objToArray(parsed);
          setBottomSheetState({
            text: "Official DVLA data:",
            data: parsed,
          });
        });
      }}
      style={styles.dvla}
    >
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={{ color: "#e9e3e3", fontSize: 18 }}>
          Official <Text style={{ fontStyle: "italic" }}>DVLA</Text> data{" "}
        </Text>
        <Icon name="search" size={25} color="#e9e3e3" />
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

export default DvlaButton;
