import express from "express";
import { Database } from "../mysql/db.js";
import fetch from "node-fetch";
const router = express.Router();

// get all data entries
router.route("/data").get((req, res) => {
  Database.getData(function (err, result) {
    if (!err) {
      res.send(result);
      console.log(result);
    }
  });
});

router.route("/parkingzone").get((req, res) => {
  Database.getDataParkingZone(function (err, result) {
    if (!err) {
      res.send(result);
      console.log(result);
    }
  });
});

const API_URL_OPENDATA_PARKING_GARAGES =
  "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=2a82a145-0195-4081-a13c-b0e587e9b89c";

router.route("/opendata").get((req, res) => {
  fetch(API_URL_OPENDATA_PARKING_GARAGES)
    .then((response) => response.json())
    .then((data) => res.send(data.result.records))
    .catch(console.error());
});

// controll led´s
router.post("/led/:id", function (req, res) {
  var id = req.params.id;
  // publish message
});

export { router };
