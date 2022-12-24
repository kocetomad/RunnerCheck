import React from "react";
import { View, StyleSheet, Text } from "react-native";

//Badge view for location tags
const NumberPlateCard = ({ reg }) => {
  return (
    <View style={styles.card}>
      <Text>{reg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.4,
    padding: 10,
    marginRight: 5,
    elevation: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#ffcd00",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1, //Centered vertically
  },
  tinyLogo: {
    flex: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default NumberPlateCard;
