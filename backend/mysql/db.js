import mysql from "mysql";

const pool = mysql.createPool({
  user: "pi",
  host: "mysql_db", // FIXME: localhost or mysql_db. "Real is localhost, but only works on mine if mysql_db"
  port: "3306",
  password: "foobar",
  database: "buildingiot",
});

/* FIXME: Why is it necessary to create the tables here?  */
pool.getConnection((err, connection) => {
  if (err) throw err
  connection.query(
    `CREATE TABLE parkingZone
    ( parkingZoneID VARCHAR(50),
      PRIMARY KEY (parkingZoneID),
      latitude FLOAT(4,2),
      longitude FLOAT(4,2),
      totalCapacity INT(4),
      freeSlots INT(4))`, (err) => {
        if (err) throw err
    })
  connection.query(
    `CREATE TABLE parkingSlot
    ( slotID INT(10),
      isOccupied BOOLEAN,
      parkingZoneID VARCHAR(50),
      FOREIGN KEY (parkingZoneID) REFERENCES parkingZone(parkingZoneID),
      PRIMARY KEY(slotID, parkingZoneID))`, (err) => {
        if(err) throw err;
    })
  connection.query(
    `CREATE TABLE historical
    ( parkingZoneID VARCHAR(50),
      time timestamp default current_timestamp,
      freeSlots INT(4),
      totalCapacity INT(4))`, (err) => {
        if(err) throw err
      }
    )
  connection.release()
})

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
    console.log("UPDATING MOTHERFUCKER")
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
}

export { pool, Database };
