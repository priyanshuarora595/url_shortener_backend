const express = require('express');
const router = express.Router();

const urlRoutes = require("./url.route");
const userRoute = require("./user.route");
const urlController = require("../controllers/url.controller");


router.use("/url",urlRoutes);
router.use("/",userRoute);
router.get("/*",urlController.redirect);

module.exports = router;