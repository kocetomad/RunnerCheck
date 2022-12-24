import * as React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

const ManualSearchBar = ({ stylesheet, setBottomSheetState }) => {
  const navigation = useNavigation();
  const [textSearchbar, textSearchbarChanged] = useState("");
  const [searchState, setSearchState] = useState("");

  return (
    <View style={{ zIndex: 1 }}>
      <TextInput
        style={sheetStyle.input}
        onChangeText={textSearchbarChanged}
        placeholder="Enter a registration number"
        value={textSearchbar}
      />
      <TouchableOpacity
        onPress={() => {
          if (
            /^(^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$)|(^[A-Z][0-9]{1,3}[A-Z]{3}$)|(^[A-Z]{3}[0-9]{1,3}[A-Z]$)|(^[0-9]{1,4}[A-Z]{1,2}$)|(^[0-9]{1,3}[A-Z]{1,3}$)|(^[A-Z]{1,2}[0-9]{1,4}$)|(^[A-Z]{1,3}[0-9]{1,3}$)|(^[A-Z]{1,3}[0-9]{1,4}$)|(^[0-9]{3}[DX]{1}[0-9]{3}$)$/.test(
              textSearchbar.replace(/\s+/g, "").toUpperCase()
            )
          ) {
            navigation.navigate("Car Details", { regNum: textSearchbar });
          } else {
            setSearchState("invalid")
          }
        }}
        style={sheetStyle.button}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            top: "20%",
          }}
        >
          <Text style={{ color: "#e9e3e3" }}>Search</Text>
        </View>
      </TouchableOpacity>
      
      {searchState == "invalid" ? <View style={{flexDirection:"column", alignSelf:"center",marginTop:5}}>
      <Icon name="alert-circle-outline" size={50} color="#e9e3e3" style={{alignSelf:"center"}} />
        <Text>
            Invalid registration number
        </Text>
      </View> : ""}
      {searchState == "loading" ? <View>
        <Text>
            Loading...
        </Text>
      </View> : ""}
      

    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const sheetStyle = StyleSheet.create({
  input: {
    marginTop: 5,
    width: windowWidth - windowWidth * 0.2,
    height: 100,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    backgroundColor: "#dad8d9",
    borderRadius: 15,
    elevation: 8,
  },
  button: {
    marginTop: 5,
    width: windowWidth - windowWidth * 0.2,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    backgroundColor: "#f4717f",
    borderRadius: 15,
    elevation: 8,
  },
});

export default ManualSearchBar;
