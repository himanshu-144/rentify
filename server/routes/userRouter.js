const express = require("express");
const { propertyListController } = require("../controllers/userController");

const router = express.Router();

router.get("/:userId/properties", propertyListController);

module.exports = router;
