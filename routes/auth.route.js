const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const authController = require("../controllers/auth.controller");

router.post("/signup",authController.signup);
router.post("/login",authController.login);
router.use(authMiddleware.verifyTokenMiddleware);
router.get("/logout",authController.logout)


module.exports = router;