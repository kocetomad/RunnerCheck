import { useRef, useState, useLayoutEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import Swiper from "react-native-swiper";

/**
 * Represents the onboarding/help view.
 * @constructor
 * @param {permission state} requestPermission - camera persmssion state passed on from the main camera view.
 * @param {route} route - React navigation route parameters.
 * */
const Onboarding = ({ requestPermission, route }) => {
  const width = Dimensions.get("window").width;
  const [mode, setMode] = useState("horizontal-stack");
  const navigation = useNavigation();

  let navCheck = "false";

  if (route != undefined || route != null) {
    const { nav } = route.params;
    navCheck = nav;
  } else {
  }

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons loop={false}>
        <View testID="Hello" style={styles.slide1}>
          <Text style={styles.title}>Welcome to{"\n"}Runner Check! 🥳</Text>
          <Text style={[styles.text, { marginTop: 30 }]}>
            <Text style={{ fontStyle: "italic" }}>Swipe right</Text> to
            familiarise yourself with the app
          </Text>
          <Text style={[styles.text, { marginTop: 30 }]}>or</Text>
          {navCheck == "true" ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Camera");
              }}
              style={styles.button}
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
                <Text
                  style={{
                    color: "#e9e3e3",
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Proceed straight to the app
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={requestPermission} style={styles.button}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                  position: "absolute",
                  top: "20%",
                }}
              >
                <Text
                  style={{
                    color: "#e9e3e3",
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Proceed straight to the app
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View testID="Hello" style={styles.slide1}>
          <Text style={styles.text}>
            Take a picture of a car's number plate{" "}
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/pic1.png")}
          />
        </View>
        <View testID="slide2" style={styles.slide1}>
          <Text style={styles.text}>
            Select scanned registration plate (multiple possible)
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/pic5.jpg")}
          />
        </View>

        <View testID="Beautiful" style={styles.slide2}>
          <Text style={styles.text}>
            View car specs,{"\n"} dvla data and issues
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/pic3.jpg")}
          />
        </View>
        <View testID="slide2" style={styles.slide1}>
          <Text style={styles.text}>Save the details {"\n"}for a vehicle</Text>
          <Image
            style={styles.image}
            source={require("../../assets/pic2.png")}
          />
        </View>
        <View testID="slide2" style={styles.slide1}>
          <Text style={styles.text}>View saved{"\n"}vehicles</Text>
          <Image
            style={styles.image}
            source={require("../../assets/pic4.png")}
          />
        </View>
        <View testID="Simple" style={styles.slide3}>
          <Text style={styles.text}>The app requires camera permissions</Text>
          {navCheck == "true" ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Camera");
              }}
              style={styles.button}
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
                <Text style={{ color: "black", fontSize: 17 }}>
                  I understand and wish to proceed
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={requestPermission} style={styles.button}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                  position: "absolute",
                  top: "20%",
                }}
              >
                <Text style={{ color: "black", fontSize: 17 }}>
                  I understand and wish to proceed
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Swiper>
    </View>
  );
};
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    marginTop: 50,
    width: width - width * 0.2,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10,
    backgroundColor: "#ffcd00",
    borderRadius: 15,
    elevation: 8,
    alignSelf: "center",
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4717f",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4717f",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4717f",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 10,
  },
  image: {
    width: width * 0.88,
    height: width * 1.6,
    resizeMode: "cover",
    borderRadius: 20,
  },
});

export default Onboarding;
