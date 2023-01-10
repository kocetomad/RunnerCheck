import * as React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { fetchIssues } from "./data/Data";

const CommonIssuesButton = ({ setBottomSheetState, carSpecs }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigation.navigate("Search", {
        //   locs: allLocations,
        // });
        setBottomSheetState({
          text:
        "Loading...",
        });
        fetchIssues(carSpecs[1].split(" ")[1], carSpecs[2].split(" ")[1]).then(
          (processed) => {
            if (processed.answer_box.list !== undefined) {
              setBottomSheetState({
                text: "Common Issues:",
                data: processed.answer_box.list,
                link: [carSpecs[1].split(" ")[1], carSpecs[2].split(" ")[1]]
              });
            } else {
              setBottomSheetState({
                text: "Couldn't find any common issues:",
                link: [carSpecs[1].split(" ")[1], carSpecs[2].split(" ")[1]]
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
