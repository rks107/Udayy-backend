const passport = require('passport');
const jwt = require("jsonwebtoken");
const conn = require("../config/mysql");

// FOR FETCHING PERTICULER USER BY IT'S ID 
module.exports.profile = function (req, res) {
  conn.query(
    `SELECT * FROM user where id = (?)`,
    [req.params.id],
    function (err, user) {
      if (user.length == 0) {
        return res.status(404).json({
          message: `user with user ID ${req.params.id} is not found or Invalid PAN Number.`,
        });
      }

      return res.status(200).json({
        message: `User with user ID ${req.params.id} is Found!`,
        user: user,
      });
    }
  );
};


// SIGNED UP
module.exports.create = function (req, res) {


  if (req.body.password == req.body.confirm_password) {
    conn.query(
      `SELECT * FROM user where username = (?)`,
      [req.body.username],
      function (err, user) {
        if (user[0] && user[0].username == req.body.username) {
          return res.status(422).json({
            message: "Username already exits",
          });
        } else {
          conn.query(
            `INSERT INTO user (username, password) VALUES (?, ?);`,
            [req.body.username, req.body.password],
            function (err, user, fields) {
              if (err) throw err;
              else {
                return res.status(200).json({
                  message: "Signed Up Suceesfully",
                  user: user,
                });
              }
            }
          );
        }
      }
    );
  } else {
    return res.status(404).json({
      message: "Password and confirm password does not match",
    });
  }
};

// FOR DELETING PERTICULER USER BY IT ID (It happened only when user is singed in)
module.exports.destroy = async function (req, res) {
  try {

    conn.query(`SELECT * FROM user where id = (?)`, [req.params.id], function (err, user) {

      if (user.length != 0) {
        conn.query(`DELETE from user where id = ?`, [req.params.id], function(err, user){
          
          return res.status(200).json({
            message: "User information deleted sucessfully!",
          });
          
        })
      } else {
         return res.status(404).json({
           message: `User with ID ${req.params.id} is not found!`,
         });
     }
    });
    
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// Sign in and create a JWT Access Token for the user
module.exports.createSession = async function (req, res) {
  try {
    conn.query(
      `select * from user where username = ?`,
      [req.body.username], function(err, user){
        if (user.length == 0 || user[0].password != req.body.password) {
          return res.status(422).json({
            message: "Invalid user or password",
            user: user
          });
        }

        return res.status(200).json({
          message: "Sign is Succesfully, Here is your token !",
          data: {
            token: jwt.sign(
              {
                data: JSON.stringify(user[0]),
              },
              "udayy-backend",
              { expiresIn: "1h" }
            ),
          },
        });
      }
    );
    
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
