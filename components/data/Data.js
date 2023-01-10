const cheerio = require("react-native-cheerio");
import React from "react";
import { useRef, useState } from "react";

//Unpacking and processing the scraped car data
export async function loadCarData(regNum) {
  console.log(regNum)
  const searchUrl = `https://www.rapidcarcheck.co.uk/results/?RegPlate=${regNum}`; //DA21XSO//EG05MJF
  const response = await fetch(searchUrl); // fetch page
  const htmlString = await response.text(); // get response text
  const $ = cheerio.load(htmlString); // parse HTML string
  let data = [];
  let pic = [];
  data = $("p", ".wpb_wrapper").map((_, p) => ({
    // map to an list of objects
    asin: $(p).text(),
  }));
  pic = $(".image1").attr("src");
  //data object
  data.splice(0, 2);
  let processed = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (index >= 41) {
      break;
    }
    if (element.asin.includes(": ") && element.asin.length < 60) {
      processed.push(element.asin);
    }
  }
  processed.push(pic);
  return processed;
}

export async function fetchDvlaData(reg) {
  return fetch(
    "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "RjpW2eqWGT8V9CoRtm2gt26yEHUBph9i38hFrkVO",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ registrationNumber: reg }),
    }
  )
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}

const isObject = (obj) => {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
};
export const objToArray = (obj) => {
  return Object.keys(obj).map((key) => {
    return [key, isObject(obj[key]) ? objToArray(obj[key]) : obj[key]];
  });
};

export async function fetchIssues(make,model) {
  console.log(make+" "+model+" issues")
  return fetch(
    "https://serpapi.com/search?" +
      new URLSearchParams({
        engine: "google",
        q: make+" "+model+" issues",
        gl:"uk",
        api_key:
          "0b2e9bb79036ff43060f1097a81e64de01129f10c734809bdc2a3998c86aafba",
      })
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json.answer_box)
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}
