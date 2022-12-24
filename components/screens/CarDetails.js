import React from "react";
import { View, StyleSheet, Text } from "react-native";
const cheerio = require('react-native-cheerio')

//Unpacking and processing the scraped car data
async function loadCarData() {
  const searchUrl = `https://www.rapidcarcheck.co.uk/results/?RegPlate=SK06VVH`;//DA21XSO
  const response = await fetch(searchUrl);  // fetch page 
  const htmlString = await response.text(); // get response text
  const $ = cheerio.load(htmlString);       // parse HTML string
  let data = []
  data = $('p','.wpb_wrapper').map((_, p) => ({                      // map to an list of objects
    asin: $(p).text(),                   
  }));
  //data object
  data.splice(0,2);
  let processed = []
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if(index >= 41){
      break;
    }
    if (
      element.asin.includes(
        ": "
      ) && element.asin.length < 60
    ) {
      console.log(element.asin)
      processed.push(element.asin)
    }
  }
  return(processed)
}


//Badge view for location tags
const CarDetailsView = ({ route }) => {
  const { regNum } = route.params;
  loadCarData()
  return (
    <View style={{flex:1}}>
      <Text>Car Details for: {regNum}</Text>
    </View>
  );
};

export default CarDetailsView;
