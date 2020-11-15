const express = require("express");
const app = express();
const port = 8000;
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

// middleware
app.use(express.urlencoded({ extended: true }));

// use express router
app.use("/", require("./routers"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in runing surver: ${err}`);
    return;
  }

  console.log(`Server is runing on port: ${port}`);
});
