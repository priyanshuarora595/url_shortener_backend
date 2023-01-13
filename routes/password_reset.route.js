const express = require('express');
const router = express.Router();

const password_reset_controller = require("../controllers/password_reset.controller");

router.post("/:userId/:token",password_reset_controller.ResetPasswordLink);
router.post("/",password_reset_controller.ResetPassword);

module.exports = router;