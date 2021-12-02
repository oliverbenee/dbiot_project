import mysql from "mysql";

const pool = mysql.createPool({
  user: "pi",
  host: "mysql_db", // FIXME: localhost or mysql_db. "Real is localhost, but only works on mine if mysql_db"
  port: "3306",
  password: "foobar",
  database: "buildingiot",
});

class Database {
  // get data
  static getDataParkingSlots(parkingZoneID, callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * FROM parkingSlot WHERE parkingZoneID='" + parkingZoneID + "'",
        (err, results, fields) => {
          console.log("Data fetched");
          callback(err, results);
          connection.release();
        }
      );
    });
  }

  // get history opendate.dk for one specific day
  static getHistory(parkingZone, day, callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT time, totalCapacity, AVG(freeSlots) AS average FROM historical WHERE parkingZoneID='" +
          parkingZone +
          "' AND dayofweek(time) = " +
          day,
        (err, results, fields) => {
          console.log("Data fetched");
          callback(err, results);
          connection.release();
        }
      );
    });
  }

  // get data
  static getDataParkingZone(callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * FROM parkingZone", (err, results, fields) => {
        console.log("Data fetched");
        callback(err, results);
        connection.release();
      });
    });
  }

  // update parking slot
  static updateParkingSlot(tah) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const sql =
        "UPDATE parkingSlot SET isOccupied =" +
        tah.isOccupied +
        " WHERE slotID =" +
        tah.slotID +
        " AND parkingZoneID='" +
        tah.parkingZoneID +
        "'";
      connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        console.log("Parking slot data updated");
        connection.release();
      });
    });
  }

  /* Insert open data. Filters elements with 0 spaces and vehicles automatically. 
  
  */
  static insertOpenData(tah) {
    /*
      Useful for debugging API data. 
      tah.forEach(element => {
        console.log("------------------------")
        console.log(JSON.stringify(element, null, 4))
      });
    */
    tah = tah.filter((item) => item.totalSpaces != 0 && item.vehicleCount != 0);
    //console.log("Inserting open data")
    pool.getConnection((err, connection) => {
      if (err) throw err;
      tah.forEach((element) => {
        const sql =
          "INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES (?, ?, ?)";
        var freeSlots = element.totalSpaces - element.vehicleCount;
        connection.query(
          sql,
          [element.garageCode, freeSlots, element.totalSpaces],
          (err, results, fields) => {
            //console.log("Inserting: " + element.garageCode + ", " + freeSlots + ", " + element.totalSpaces)
            if (err) throw err;
          }
        );
      });
      console.log("Open Data inserted!");
      connection.release();
    });
  }
}

export { pool, Database };
