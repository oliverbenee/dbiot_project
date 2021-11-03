const mysql = require("mysql");

const pool = mysql.createPool({
  user: "pi",
  host: "localhost",
  port: "3306",
  password: "foobar",
  database: "buildingiot",
});

/* Creates a table called dhtdata if it doesn't exist in our database  */
pool.getConnection((err, connection) => {
  if (err) throw err;

  connection.query("DROP TABLE IF EXISTS dhtdata", function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });

  connection.query("DROP TABLE IF EXISTS parkingZone", function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });

  connection.query("DROP TABLE IF EXISTS parkingSlot", function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
  connection.query(
    `CREATE TABLE dhtdata
    ( time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      temperature FLOAT(4,2) NOT NULL, 
      humidity FLOAT(4,2) NOT NULL,
      distance FLOAT(4,2) NOT NULL,
      led_1_status INT(1),
      led_2_status INT(1),
      led_3_status INT(1)
      )`,
    function (err, result) {
      if (err) throw err;
      console.log("Table sensorData created");
    }
  );

  connection.query(
    `CREATE TABLE parkingZone
    ( parkingZoneID VARCHAR(50),
      PRIMARY KEY (parkingZoneID),
      latitude FLOAT(4,2),
      longitude FLOAT(4,2),
      totalCapacity INT(4),
      freeSlots INT(4)
  )`,
    function (err, result) {
      if (err) throw err;
      console.log("Table parkingZone created");
    }
  );

  connection.query(
    `CREATE TABLE parkingSlot
    ( slotID INT(10),
      isOccupied BOOLEAN,
      parkingZoneID VARCHAR(50),
      PRIMARY KEY (slotID),
      FOREIGN KEY (parkingZoneID) REFERENCES parkingZone(parkingZoneID)
)`,
    function (err, result) {
      if (err) throw err;
      console.log("Table parkingSlot created");
    }
  );
  connection.release();
});

class Dhtdata {
  // get data
  static getData(callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * FROM dhtdata ORDER BY time DESC",
        (err, results, fields) => {
          console.log("Data fetched");
          callback(err, results);
          connection.release();
        }
      );
    });
  }

  // get latest data
  static getLatestEntry(callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * FROM dhtdata ORDER BY time DESC LIMIT 1",
        (err, result, fields) => {
          console.log("Data fetched");
          callback(err, result);
          connection.release();
        }
      );
    });
  }

  // insert Data
  static insert(tah) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const sql =
        "INSERT INTO dhtdata(temperature, humidity, distance, led_1_status, led_2_status, led_3_status) VALUES (?, ?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [
          tah.temperature,
          tah.humidity,
          tah.distance,
          tah.led_1_status,
          tah.led_2_status,
          tah.led_3_status,
        ],
        (err, results, fields) => {
          if (err) throw err;
          console.log("Data inserted");
          connection.release();
        }
      );
    });
  }
}

module.exports = pool;
module.exports = Dhtdata;
