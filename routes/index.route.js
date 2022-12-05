const express = require('express');
const router = express.Router();

const urlRoutes = require("./url.route");
const userRoute = require("./user.route");
const urlController = require("../controllers/url.controller");

const userRoutes = require("./user.route");
const authRoutes = require("./auth.route")

const authMiddleware = require("../middleware/auth.middleware");


router.use("/auth",authRoutes);

router.use("/url",authMiddleware.verifyTokenMiddleware,urlRoutes);
// router.use("/",authMiddleware.verifyTokenMiddleware,userRoute);
router.use("/user",userRoutes);

router.get("/*",urlController.redirect);

module.exports = router;