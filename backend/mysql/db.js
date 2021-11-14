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

  // insert into the historical table.
  static insertOpenData(tah){
    console.log("OPEN DATA OBJECT: " + tah)
    tah.forEach(element => {
      console.log("------------------------")
      console.log("PZID: " + element.parkingZoneID)
      console.log("FSLOT: " + element.freeSlots)
      console.log("TOTC: " + element.totalCapacity)
    });
    console.log("Inserting open data")
    pool.getConnection((err, connection) => {
      const tah = {
        parkingZoneID: "KALKVAERKSVEJ",
        freeSlots: 2,
        totalCapacity: 10
      }
      if(err) throw err;
      const sql = "INSERT INTO historical(parkingZoneID, freeSlots, totalCapacity) VALUES (?, ?, ?)";
      connection.query(sql, [tah.parkingZoneID, tah.freeSlots, tah.totalCapacity], (err, results, fields) => {
        if(err) throw err;
        console.log("opendata inserted");
        connection.release();
      })
    })
  }
}

export { pool, Database };
