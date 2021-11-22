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
        res.send(result);
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


// get data from opendata.dk parking garages in aarhus
router.route("/opendata").get((req, res) => {
  console.log("APIIIIIIIIII")
  fetch(API_URL_OPENDATA_PARKING_GARAGES)
    .then((response) => response.json())
    .then((data) => res.send(data.result.records))
    .catch(console.error());
});

export { router };
