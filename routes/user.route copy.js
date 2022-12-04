const express = require('express');
const router = express.Router();

const user = require("../controllers/user.controller")

router.get("/", user.getUserDetails);
router.post("/", user.setUserDetails);

module.exports = router;