const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const urlRoutes = require("./url.route");
const userRoute = require("./user.route");
const urlController = require("../controllers/url.controller");

const userRoutes = require("./user.route");
const authRoutes = require("./auth.route")


router.use("/url",authMiddleware,urlRoutes);
router.use("/",authMiddleware,userRoute);
router.get("/*",urlController.redirect);

router.use("/user",userRoutes);
router.use("/auth",authRoutes);

module.exports = router;