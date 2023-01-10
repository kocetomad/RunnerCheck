import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouritesButton = ({ stylesheet, setBottomSheetState }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigation.navigate("Search", {
        //   locs: allLocations,
        // });
        (async function () {
          try {
            
             keys = await AsyncStorage.getAllKeys()
             //return await AsyncStorage.getItem('key1')
            return await AsyncStorage.multiGet(keys)
             
          } catch(e) {
            // read key error
          }
        })().then((keys) => {
          console.log(keys)
          setBottomSheetState({
            text:
              "Saved vehicles:",
            data:
              keys,
          });
        });
      }}
      style={stylesheet}
    >
      <View style={{ flexDirection: "row", alignItems: "center",alignSelf:"center" }}>
        <Text style={{color:"#f4717f",fontSize: 14}}>Favourites </Text>
        <Icon name="star-outline" size={25} color="#f4717f" />
      </View>
    </TouchableOpacity>
  );
};

export default FavouritesButton;
