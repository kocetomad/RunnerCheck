import * as React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

/**
 * Represents the "More issues button" inside of the issues tab inside the car details view.
 * @constructor
 * @param {string} make - The take Picture function inside the main camera view.
 * @param {string} model - The take Picture function inside the main camera view.
 */
const BrowserLinkButton = ({ make, model }) => {
  const navigation = useNavigation();
  const [searchState, setSearchState] = useState("");

  return (
    <View style={{ zIndex: 1 }}>
      <TouchableOpacity
        /** Function that uses react native linking to use the native browser to open the provided link */
        onPress={() => {
          Linking.canOpenURL(
            "https://www.google.com/search?" +
              new URLSearchParams({
                q: make + " " + model + " issues",
              })
          ).then((supported) => {
            if (supported) {
              Linking.openURL(
                "https://www.google.com/search?" +
                  new URLSearchParams({
                    q: make + " " + model + " issues",
                  })
              );
            } else {
              console.log(
                "Don't know how to open URI: " +
                  "https://www.google.com/search?" +
                  new URLSearchParams({
                    q: make + " " + model + " issues",
                  })
              );
            }
          });
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
          <Text style={{ color: "#e9e3e3", fontSize: 18 }}>More Issues 🌐</Text>
        </View>
      </TouchableOpacity>

      {searchState == "invalid" ? (
        <View
          style={{ flexDirection: "column", alignSelf: "center", marginTop: 5 }}
        >
          <Icon
            name="alert-circle-outline"
            size={50}
            color="#e9e3e3"
            style={{ alignSelf: "center" }}
          />
          <Text>Invalid registration number</Text>
        </View>
      ) : (
        ""
      )}
      {searchState == "loading" ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const sheetStyle = StyleSheet.create({
  button: {
    marginTop: 15,
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

export default BrowserLinkButton;
