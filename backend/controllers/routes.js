const express = require("express");
var router = express.Router();
const Database = require("../database/db");

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

// controll led´s
router.post("/led/:id", function (req, res) {
  var id = req.params.id;
  // publish message
});

module.exports = router;
