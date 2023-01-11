import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
} from "@react-navigation/native";

/**
 * Represents the Camera button inside the main camera view.
 * @constructor
 * @param {function} takePicture - The take Picture function inside the main camera view.
 */
const CameraButton = ({ takePicture }) => {

  return (
    <TouchableOpacity
      style={{
        alignSelf: "flex-end",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        width: 80,
        height: 80,
        backgroundColor: "#fff",
        borderRadius: 50,
      }}
      onPress={takePicture}
    >
      <Icon name="camera-outline" size={30} color="#f4717f" />
    </TouchableOpacity>
  );
};

export default CameraButton;
