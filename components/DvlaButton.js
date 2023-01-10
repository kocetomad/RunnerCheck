import * as React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { fetchDvlaData } from "./data/Data";
import { objToArray } from "./data/Data";

const DvlaButton = ({ setBottomSheetState, reg }) => {
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
        fetchDvlaData(reg).then((processed) => {
          let parsed = (JSON.parse(JSON.stringify(processed)));
          parsed = (objToArray(parsed));
            setBottomSheetState({
              text:
                "Official DVLA data:",
              data: parsed
            });
          });
        
      }}
      style={styles.dvla}
    >
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={{color:"#e9e3e3", fontSize:18}}>Official <Text style={{fontStyle:"italic"}}>DVLA</Text> data </Text>
        <Icon name="search" size={25} color="#e9e3e3" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    dvla: {
      marginHorizontal: 30,
      paddingVertical:10,
      marginVertical: 5,
      borderWidth: 2,
      elevation: 5,
      borderRadius: 10,
      padding: 5,
      borderColor: "white",
      backgroundColor: "#f4717f"
    },
  })

export default DvlaButton;

