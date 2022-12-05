// const express = require('express');
// const router = express.Router();

// const userController = require("../controllers/user.controller");

// router.get("/",userController.dashboard);


// module.exports = router;



const express = require('express');
const router = express.Router();

const user = require("../controllers/user.controller")

router.get("/", user.getUserDetails);
router.post("/", user.setUserDetails);

module.exports = router;