const mysql = require("mysql");

const pool = mysql.createPool({
  user: "pi",
  host: "localhost",
  port: "3306",
  password: "foobar",
  database: "buildingiot",
});

class Database {
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
module.exports = Database;
