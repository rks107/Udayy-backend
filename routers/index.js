const express = require("express");
const router = express.Router();

// FOR USE OF USERS ROUTER
router.use("/users", require("./users"));

module.exports = router;