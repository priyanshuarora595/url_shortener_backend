const express = require('express');
const router = express.Router();
const urlController = require("../controllers/url.controller");
router.post("/",urlController.createNewRedirection);
router.get("/",urlController.getAllUrls);

module.exports = router;