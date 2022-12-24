import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import axios, { AxiosError } from "axios";
import * as FileSystem from "expo-file-system";
import BottomSheetMain from "../BottomSheetMain";
import ManualSearchButton from "../ManualSearchButton";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
/**
 * Camera view to take images and have them ready in the app cache
 * @returns
 */
let pad = 10;
export default function CarModelCameraView() {

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [regNumbers, setRegNumbers] = useState([]);
  const [bottomSheetState, setBottomSheetState] = useState({ text: "-" });


  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      pad = remainder;
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  let camera = useRef < Camera > null;

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (!permission) return;
    // @ts-ignore
    const photo = await camera.takePictureAsync();

    console.log("finished taking photo here's the photo", photo);

    const imageBase64 = await FileSystem.readAsStringAsync(`${photo.uri}`, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const data = {
      requests: [
        {
          image: {
            content: imageBase64,
          },
          features: [{ type: "TEXT_DETECTION", maxResults: 5 }],
        },
      ],
    };

    //fetching Vision AI results
    try {
      const res = await axios.post(
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDBNHsBZ-AkKromEvC4lpA4TrWlFazoMZ0",
        data
      );

      console.log("res ", res.data);
      //console.log("responses ", res.data.responses[0].textAnnotations[0].description.split('\n'));
      //finding all valid number plates in the picture
      let numberPlatesFound = [];
      let scannedText = res.data.responses[0].textAnnotations[0].description.split("\n");
      (async function () {
          scannedText.forEach((element) => {
            //regex to check for a valid UK number plate
            if (
              /^(^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$)|(^[A-Z][0-9]{1,3}[A-Z]{3}$)|(^[A-Z]{3}[0-9]{1,3}[A-Z]$)|(^[0-9]{1,4}[A-Z]{1,2}$)|(^[0-9]{1,3}[A-Z]{1,3}$)|(^[A-Z]{1,2}[0-9]{1,4}$)|(^[A-Z]{1,3}[0-9]{1,3}$)|(^[A-Z]{1,3}[0-9]{1,4}$)|(^[0-9]{3}[DX]{1}[0-9]{3}$)$/.test(
                element.replace(/\s+/g, "").toUpperCase()
              )
            ) {
              numberPlatesFound.push(element);
              setRegNumbers((regNumbers) => [...regNumbers, element]);
            }
          });
        })()
        .then(() => {
          setBottomSheetState({
            text:
              "Select a number plate:",
          });
        });
    } catch (err) {
      const _err = err;
      console.log("err ", _err);
    }
  }

  const styles_2 = StyleSheet.create({
    search_button: {
      alignSelf: "flex-end",
      position: "absolute",
      top: imagePadding,
      borderWidth: 2,
      borderRadius: 10,
      padding: 5,
      borderColor: "white",
      backgroundColor: "#f4717f"
    },
  })
  return (
    <View style={styles.container}>
      <Camera
        onCameraReady={setCameraReady}
        ref={(ref) => {
          if (ref !== null) camera = ref;
        }}
        style={[
          styles.cameraPreview,
          { marginTop: imagePadding, marginBottom: imagePadding },
        ]}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <ManualSearchButton stylesheet={styles_2.search_button} setBottomSheetState={setBottomSheetState}/>
      <BottomSheetMain setRegNumbers={setRegNumbers} regNumbers={regNumbers} bottomSheetState={bottomSheetState}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#181818"
  },
  camera: {
    flex: 1,
  },
  
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  cameraPreview: {
    flex: 1,
  },
});
