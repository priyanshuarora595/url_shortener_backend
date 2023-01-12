

const express = require('express');
const router = express.Router();

const user = require("../controllers/user.controller")

router.get("/", user.getUserDetails);
router.post("/", user.setUserDetails);
router.post("/delUser",user.delUserAccount);

module.exports = router;