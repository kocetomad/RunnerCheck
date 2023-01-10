import * as React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
let width = 0
const CarSpecsList = ({ specList }) => {
  const navigation = useNavigation();
  width = Dimensions.get("window").width;
  return specList.slice(1).map((spec) => (
    <View key={spec} style={styles.spec}>
    <Text style={{fontSize:20}}>
      {spec}
    </Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#181818",
  },
  spec: {
    paddingLeft:2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#f4717f",
    marginHorizontal: 30,
    marginTop: 10,
    flexWrap: "wrap"
  },
});

export default CarSpecsList;
