const mysql = require('mysql')

const pool = mysql.createPool({
    user: 'pi',
    host: 'mysql_db',
    port: '3306',
    password: 'foobar',
    database: 'buildingiot'
  })

/* Creates a table called dhtdata if it doesn't exist in our database  */
pool.getConnection((err, connection) => {
    if (err) throw err

    connection.query('DROP TABLE IF EXISTS dhtdata', function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });
    connection.query(`CREATE TABLE dhtdata
    ( time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      distance FLOAT(4,2) NOT NULL,
      magsens_status INT(1)
      )`, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    connection.release()
}) 

class Dhtdata {
    // get data
    static getData(callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('SELECT * FROM dhtdata ORDER BY time DESC', (err, results, fields) => {
              console.log("Data fetched")
              callback(err, results);
              connection.release()
            })
        })
    }

    // get latest data
    static getLatestEntry(callback) {
      pool.getConnection((err, connection) => {
          if (err) throw err
          connection.query('SELECT * FROM dhtdata ORDER BY time DESC LIMIT 1', (err, result, fields) => {
            console.log("Data fetched")
            callback(err, result);
            connection.release()
          })
      })
  }
  
    // insert Data
  static insert (tah) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      const sql = 'INSERT INTO dhtdata(distance, magsens_status) VALUES (?, ?)'
      connection.query(sql, [tah.distance, tah.magsens_status], (err, results, fields) => {
        if (err) throw err
        console.log("Data inserted")
        connection.release()
      })
    })
  }

}

module.exports = pool
module.exports = Dhtdata
