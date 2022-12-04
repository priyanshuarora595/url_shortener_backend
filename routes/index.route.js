const express = require('express');
const router = express.Router();

const urlRoutes = require("./url.route");
const userRoute = require("./user.route");
const urlController = require("../controllers/url.controller");

const userRoutes = require("./user.route");
const authRoutes = require("./auth.route")


router.use("/url",urlRoutes);
router.use("/",userRoute);
router.get("/*",urlController.redirect);

router.use("/user",userRoutes);
router.use("/auth",authRoutes);

module.exports = router;