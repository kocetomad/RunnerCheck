import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteButton = ({ selected, setBottomSheetState }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
   style={{
    alignItems: "center",
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       justifyContent:'center',
       backgroundColor:'#fff',
       borderBottomRightRadius: 15,
       borderTopRightRadius: 15,
       paddingHorizontal: 10,
     }}
     onPress={() => {
      (async function () {
        try {
           //return await AsyncStorage.getItem('key1')
          
          deleted = await AsyncStorage.removeItem(selected)
          keys = await AsyncStorage.getAllKeys()
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
 >
   <Icon name="trash-outline"  size={30} color="#f4717f" />
 </TouchableOpacity>
  );
};

export default DeleteButton;
