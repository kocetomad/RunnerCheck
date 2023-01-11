import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import NumberPlateCard from "../../cards/RegistrationPlateCard";
import ManualSearchBar from "../../inputs/ManualSearchBar";
import { objToArray } from "../../data/Data";
import BrowserLinkButton from "../../button/detailsScreen-button/BrowserLinkButton";
import FavouriteCard from "../../cards/FavouriteCard";

/**
 * Represents the Bottom sheet component used to present most data inside the app.
 * @constructor
 * @param {setState} setRegNumbers - a state setter for the registration number array.
 * @param {state} regNumbers - registration numbers state variable.
 * @param {setState} setBottomSheetState - bottom sheet state setter.
 * @param {state} bottomSheetState - bottom sheet state variable.
 */
const BottomSheetMain = ({
  setRegNumbers,
  regNumbers,
  bottomSheetState,
  setBottomSheetState,
}) => {
  const bottomSheetRef = useRef(null);
  const [mapped, setMapped] = useState([]);
  const snapPoints = useMemo(() => ["1%", "50%"], []);

  /** expands or collapses the bottom sheet,
   * depending on the bottom sheet title text. */
  useEffect(() => {
    if (bottomSheetState.text.includes("Select a number plate:")) {
      bottomSheetRef.current.expand();
    }

    if (bottomSheetState.text.includes("Loading...")) {
      bottomSheetRef.current.expand();
      var mapp = <ActivityIndicator size="large" color="#f4717f" />;
      setMapped(mapp);
    }

    if (bottomSheetState.text.includes("Manual Search:")) {
      bottomSheetRef.current.expand();
      setMapped([]);
    }

    if (bottomSheetState.text.includes("Official DVLA data:")) {
      bottomSheetRef.current.expand();
    }

    if (bottomSheetState.text.includes("Saved vehicles:")) {
      bottomSheetRef.current.expand();
    }

    if (bottomSheetState.text.includes("Common Issues:")) {
      bottomSheetRef.current.expand();
    }
    if (bottomSheetState.text.includes("Couldn't find any common issues:")) {
      bottomSheetRef.current.expand();
    }
    if (bottomSheetState.text.includes("-")) {
      bottomSheetRef.current.close();
    }
  }, [bottomSheetState]);

  const handleSheetChanges = useCallback((index) => {}, []);
  /** Maps cardviews if filter area is pressed */
  useEffect(() => {
    if (regNumbers !== undefined) {
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
    }
  }, [regNumbers]);

  useEffect(() => {
    if (bottomSheetState.data !== undefined) {
      // let parsed = (JSON.parse(bottomSheetState.data));
      // parsed = (objToArray(parsed));
      (async function () {
        if (bottomSheetState.text.includes("Official DVLA data:")) {
          var mapp = bottomSheetState.data.map((item) => (
            <Text key={item}>
              {item[0].charAt(0).toUpperCase() +
                item[0]
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .toLowerCase()
                  .slice(1)}{" "}
              : {item[1]}
            </Text>
          ));
        } else if (bottomSheetState.text.includes("Saved vehicles:")) {
          var mapp = bottomSheetState.data.map((item) => (
            <FavouriteCard
              key={item[0]}
              reg={[item[0], item[1]]}
              setBottomSheetState={setBottomSheetState}
            ></FavouriteCard>
          ));
        } else {
          var mapp = bottomSheetState.data.map((item) => (
            <Text
              key={item}
              style={{ marginHorizontal: 20, alignSelf: "flex-start" }}
            >
              * {item}
            </Text>
          ));
        }

        return mapp;
      })()
        .then((mapp) => {
          setMapped(mapp);
        })
        .catch(console.error);
    }
  }, [bottomSheetState]);

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
      enablePanDownToClose={true}
    >
      <View style={sheetStyle.contentContainer}>
        {bottomSheetState ? <Text>{bottomSheetState.text}</Text> : ""}
        {bottomSheetState.text.includes("Manual Search:") ? (
          <ManualSearchBar />
        ) : (
          ""
        )}
      </View>
      <BottomSheetScrollView contentContainerStyle={sheetStyle.ScrollView}>
        <MapRegNumbers regs={mapped} />
        {bottomSheetState.text.includes("Common Issues:") ? (
          <BrowserLinkButton
            make={bottomSheetState.link[0]}
            model={bottomSheetState.link[1]}
          />
        ) : (
          ""
        )}
        {bottomSheetState.text.includes("Couldn't find any common issues:") ? (
          <BrowserLinkButton
            make={bottomSheetState.link[0]}
            model={bottomSheetState.link[1]}
          />
        ) : (
          ""
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const sheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
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
