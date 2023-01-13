

const express = require('express');
const router = express.Router();

const user = require("../controllers/user.controller")

router.get("/", user.getUserDetails);
router.post("/", user.setUserDetails);
router.post("/delUser",user.delUserAccount);
router.post("/ChangePassword",user.ChangePassword);

module.exports = router;