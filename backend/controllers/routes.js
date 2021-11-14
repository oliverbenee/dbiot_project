import express from "express";
import { Database } from "../mysql/db.js";
import fetch from "node-fetch";
const router = express.Router();

// get all parking zones
router.route("/parkingzone").get((req, res) => {
  Database.getDataParkingZone(function (err, result) {
    if (!err) {
      res.send(result);
      console.log(result);
    }
  });
});

// get all parking spots for one parking zone
router.route("/parkingslots/:parkingZoneID/:day").get((req, res) => {
  Database.getHistory(
    req.params.parkingZoneID,
    req.params.day,
    function (err, result) {
      if (!err) {
        res.send(result);
      }
    }
  );
});

// get all parking spots for one parking zone
router.route("/parkingslots/:parkingZoneID").get((req, res) => {
  Database.getDataParkingSlots(
    req.params.parkingZoneID,
    function (err, result) {
      if (!err) {
        res.send(result);
      }
    }
  );
});

// update parkingslot
router.post("/update/parkingslot", (req, res) => {
  const data = req.body;
  Database.updateParkingSlot(data);
  res.send({ status: "success" });
});

const API_URL_OPENDATA_PARKING_GARAGES =
  "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=2a82a145-0195-4081-a13c-b0e587e9b89c";

// get data from opendata.dk parking garages in aarhus
router.route("/opendata").get((req, res) => {
  console.log("APIIIIIIIIII")
  fetch(API_URL_OPENDATA_PARKING_GARAGES)
    .then((response) => response.json())
    .then((data) => res.send(data.result.records))
    .catch(console.error());
});

// Fetches data from the open data platform. 
var opendata;
// fetch interval
setInterval(() => {
  fetch(API_URL_OPENDATA_PARKING_GARAGES)
  .then((response) => response.json())
  .then((data) => {
    Database.insertOpenData(data.result.records)
    console.log("router inserting data.")
  })
  .catch(console.error());

}, 10000)

export { router };
