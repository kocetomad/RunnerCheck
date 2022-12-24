import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

const ManualSearchButton = ({ stylesheet, setBottomSheetState }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigation.navigate("Search", {
        //   locs: allLocations,
        // });
        setBottomSheetState({
          text:
            "Manual Search:",
        });
      }}
      style={stylesheet}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{color:"#e9e3e3"}}>Manual </Text>
        <Icon name="search" size={25} color="#e9e3e3" />
      </View>
    </TouchableOpacity>
  );
};

export default ManualSearchButton;
