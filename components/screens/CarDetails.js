import React from "react";
import { useRef, useState, useEffect } from "react";
import ImageModal from "react-native-image-modal";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  useLayoutEffect,
  TouchableOpacity,
} from "react-native";
import { loadCarData } from "../data/Data";
import CarSpecsList from "../CarSpecsList";
import DvlaButton from "../DvlaButton";
import Icon from "react-native-vector-icons/Ionicons";
import CommonIssuesButton from "../CommonIssuesButton";
import BottomSheetMain from "../BottomSheetMain";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Badge view for location tags
const CarDetailsView = ({ route }) => {
  const [carData, setCarData] = useState([]);
  const [carPicture, setCarPicture] = useState("");
  const [bottomSheetState, setBottomSheetState] = useState({ text: "-" });
  const nav = useNavigation();

  const { regNum, setSelectedCar } = route.params;
  useEffect(() => {
    console.log("ren num: "+ regNum)
    loadCarData(regNum).then((processed) => {
      setCarPicture(processed[processed.length - 1]);
      processed.pop();
      setCarData(processed);
      nav.setOptions({
        title: "Car Details for: " + regNum,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              (async function () {
                try {
                  console.log("saved: " + processed[0] + " " + processed[1]);
                  a = await AsyncStorage.setItem(
                    regNum + "",
                    processed[1].replace('Make: ', '') + " " + processed[2].replace('Model: ', '')
                  );
                } catch (e) {
                  // read key error
                }
              })().then(() => {});
            }}
            style={{
              marginRight: 20,
            }}
          >
            <Icon name="heart-outline" size={25} color="white" />
          </TouchableOpacity>
        ),
      });
    });
  }, []);

  const width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {carData.length > 1 ? (
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#000000"
            style={{
              width: width,
              height: width * 0.75,
            }}
            source={{
              uri: carPicture,
            }}
          />
        ) : (
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#000000"
            style={{
              width: width,
              height: width * 0.75,
            }}
            source={{
              uri: "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
            }}
          />
        )}
        <Text style={styles.spec}>Car Specs:</Text>
        <CarSpecsList specList={carData} />
        <DvlaButton setBottomSheetState={setBottomSheetState} reg={regNum} />
        <CommonIssuesButton
          setBottomSheetState={setBottomSheetState}
          carSpecs={carData}
        />
      </ScrollView>
      <BottomSheetMain bottomSheetState={bottomSheetState} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#181818",
  },
  spec: {
    paddingLeft: 2,
    borderBottomWidth: 2,
    borderColor: "#f4717f",
    marginHorizontal: 30,
    marginTop: 20,
    fontSize: 25,
    backgroundColor: "#f4717f",
  },
});

export default CarDetailsView;
