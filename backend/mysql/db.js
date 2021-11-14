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
        "SELECT * FROM historical WHERE parkingZoneID='" +
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
    console.log("UPDATING MOTHERFUCKER");
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
        console.log("Data updated");
        connection.release();
      });
    });
  }

  // TODO: MAKE THIS WORK. 
  // insert into the historical table.
  static insertOpenData(tah){
    console.log("Inserting open data")
    pool.getConnection((err, connection) => {
      if(err) throw err;
      // TODO: fetch data using GET in routes.js
      // TODO: Write sql code. 
      const sql = "INSERT INTO history(time, parkingZoneID freeSlots, totalCapacity) VALUES (?, ?, ?, ?)";
      connection.query(sql,[tah.parkingZoneID, tah.freeSlots, tah.totalCapacity], (err, results, fields) => {
        if(err) throw err;
        console.log("opendata inserted");
        connection.release();
      })
    })
  }

}

export { pool, Database };
