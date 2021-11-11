import mysql from "mysql";

const pool = mysql.createPool({
  user: "pi",
  host: "localhost",
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
        "SELECT time, AVG(freeSlots) AS average FROM historical WHERE parkingZoneID='" +
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
        false +
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

  // update parking slot
  static insertHistoricalData(tah) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const sql =
        "INSERT INTO historical(time, parkingZoneID, freeSlots, totalCapacity) VALUES (, , );";
      connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        console.log("Data updated");
        connection.release();
      });
    });
  }
}

export { pool, Database };
