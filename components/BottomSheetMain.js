import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import NumberPlateCard from "./views/NumberPlateCard";

const BottomSheetMain = ({
  setRegNumbers,
  regNumbers,
  setLoading,
  loading,
  bottomSheetState,
}) => {
  const bottomSheetRef = useRef(null);
  const [mapped, setMapped] = useState([]);
  // variables
  const snapPoints = useMemo(() => ["9%", "100%"], []);

  //expands bottom sheet if area filter butto nis pressed 
  useEffect(() => {
    if (
      bottomSheetState.text.includes(
        "Select a number plate:"
      )
    ) {
      bottomSheetRef.current.expand();
    }
  }, [bottomSheetState]);

  const handleSheetChanges = useCallback((index) => {
  }, []);
  //Maps cardviews if filter area is pressed
  useEffect(() => {
    (async function () {
      var mapp = regNumbers.map((reg, index) => (
        <NumberPlateCard key={index} reg={reg}></NumberPlateCard>
      ));
      return mapp;
    })()
      .then((mapp) => {
        setMapped(mapp);
      })
      .catch(console.error);
  }, [regNumbers]);

  // renders
  const MapRegNumbers = ({ regs }) => {
    useEffect(() => {
      //setLoading(false);
    }, []);
    return regs;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      setRegNumbers
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={sheetStyle.contentContainer}>
        <Text>{bottomSheetState.text}</Text>
      </View>
      <BottomSheetScrollView contentContainerStyle={sheetStyle.ScrollView}>
        <MapRegNumbers regs={mapped} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const sheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 0.1,
    alignItems: "center",
  },
  ScrollView: {
    alignItems: "center",
  },
});

export default BottomSheetMain;
