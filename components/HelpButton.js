import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

const HelpButton = ({ stylesheet, setBottomSheetState }) => {
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
      <View style={{ flexDirection: "row", alignItems: "center",alignSelf:"center"}}>
        <Text style={{color:"#f4717f",fontSize: 14}}>Help</Text>
        <Icon name="help-outline" size={25} color="#f4717f" />
      </View>
    </TouchableOpacity>
  );
};

export default HelpButton;
