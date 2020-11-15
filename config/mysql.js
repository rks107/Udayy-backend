const mysql = require("mysql");

var config = {
  host: "sql12.freemysqlhosting.net",
  user: "sql12376713",
  password: "869pHgy8WM",
  database: "sql12376713",
  port: 3306,
};
// var config = {
//   host: "127.0.0.1",
//   user: "root",
//   password: "Rohit@107",
//   database: "udayy_backend",
//   port: 3306,
// };

const conn = new mysql.createConnection(config);

conn.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
  }
});

module.exports = conn;
