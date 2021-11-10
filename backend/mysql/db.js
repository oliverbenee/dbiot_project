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
    `CREATE TABLE IF NOT EXISTS parkingZone
    ( parkingZoneID VARCHAR(50),
      PRIMARY KEY (parkingZoneID),
      latitude FLOAT(4,2),
      longitude FLOAT(4,2),
      totalCapacity INT(4),
      freeSlots INT(4))`, (err) => {
        if (err) throw err
    })
  connection.query(
    `CREATE TABLE IF NOT EXISTS parkingSlot
    ( slotID INT(10),
      isOccupied BOOLEAN,
      parkingZoneID VARCHAR(50),
      FOREIGN KEY (parkingZoneID) REFERENCES parkingZone(parkingZoneID),
      PRIMARY KEY(slotID, parkingZoneID))`, (err) => {
        if(err) throw err;
    })
  connection.query(
    `CREATE TABLE IF NOT EXISTS historical
    ( parkingZoneID VARCHAR(50),
      time timestamp default current_timestamp,
      freeSlots INT(4),
      totalCapacity INT(4))`, (err) => {
        if(err) throw err
      }
    )
  // Sample spots and zones.
  connection.query(`
  INSERT INTO parkingZone VALUES ("KALKVAERKSVEJ", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "KALKVAERKSVEJ");
INSERT INTO parkingSlot VALUES (2, false, "KALKVAERKSVEJ");

INSERT INTO parkingZone VALUES ("NewBusgadehuset", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "NewBusgadehuset");

INSERT INTO parkingZone VALUES ("SALLING", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "SALLING");

INSERT INTO parkingZone VALUES ("NORREPORT", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "NORREPORT");

INSERT INTO parkingZone VALUES ("Urban Level 1", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "Urban Level 1");

INSERT INTO parkingZone VALUES ("BRUUNS", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "BRUUNS");

INSERT INTO parkingZone VALUES ("MAGASIN", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "MAGASIN");

INSERT INTO parkingZone VALUES ("SCANDCENTER", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "SCANDCENTER");

INSERT INTO parkingZone VALUES ("Urban Level 2+3", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "Urban Level 2+3");

INSERT INTO parkingZone VALUES ("Navitas", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "Navitas");

INSERT INTO parkingZone VALUES ("New Bruuns Galleri", 56.149456595160515, 10.211865426037953, 210, 44);
INSERT INTO parkingSlot VALUES (1, true, "New Bruuns Galleri");

INSERT INTO parkingZone VALUES ("DOKK1", 12.12, 34.34, 1234, 5678);
INSERT INTO parkingSlot VALUES (1, false, "DOKK1");
  `, (err) => {if(err) throw err})
    
    
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
