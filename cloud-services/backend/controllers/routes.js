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

// get average history data for free spots for one specific parking zone at a specific week day
router.route("/history/:parkingZoneID/:day").get((req, res) => {
  Database.getHistory(
    req.params.parkingZoneID,
    req.params.day,
    function (err, result) {
      if (!err) {

        // convert data into right format
        var data = [
          {x: 1, y: result[0]},
          {x: 2, y: result[1]},
          {x: 3, y: result[2]},
          {x: 4, y: result[3]},
          {x: 5, y: result[4]},
          {x: 6, y: result[5]},
          {x: 7, y: result[6]}
          ]
        res.send(data);
      } else {
        console.log("error: ", err);
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

export { router };
