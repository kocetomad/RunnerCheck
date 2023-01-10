import { useRef, useState, useLayoutEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import Swiper from 'react-native-swiper'

const Onboarding = ({ requestPermission }) => {
  const width = Dimensions.get("window").width;
  const [mode, setMode] = useState('horizontal-stack');
  const navigation = useNavigation();
  let pics = [
    "https://www.sktthemes.org/wp-content/uploads/2019/10/watermark-images.jpg",
    "https://www.sktthemes.org/wp-content/uploads/2019/10/watermark-images.jpg",
    "https://www.sktthemes.org/wp-content/uploads/2019/10/watermark-images.jpg",
    "https://www.sktthemes.org/wp-content/uploads/2019/10/watermark-images.jpg",
    "https://thumbs.dreamstime.com/b/example-vector-stamp-icon-sample-watermark-rubber-stamp-example-vector-stamp-icon-sample-watermark-rubber-stamp-167589333.jpg",
  ];
  return (
    <View style={styles.container}>
      
    
    <Swiper style={styles.wrapper} showsButtons loop={false}>
    <View testID="Hello" style={styles.slide1}>
      <Text style={styles.text}>Take a picture of a car's number plate </Text>
    </View>
    <View testID="Beautiful" style={styles.slide2}>
      <Text style={styles.text}>Beautiful</Text>
    </View>
    <View testID="Simple" style={styles.slide3}>
      <Text style={styles.text}>And simple</Text>
      <TouchableOpacity
        onPress={requestPermission}
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
          <Text style={{ color: "#e9e3e3", fontSize:17 }}>I understand and wish to proceed</Text>
        </View>
      </TouchableOpacity>
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
    flexWrap: 'wrap',
  },
  button: {
    marginTop: 50,
    width: width - width * 0.2,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    backgroundColor: "#f4717f",
    borderRadius: 15,
    elevation: 8,
    alignSelf:"center"
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center"

  }
});

export default Onboarding;
