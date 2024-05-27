const express = require("express");

const router = express.Router();
const multer = require("multer");
const {
  createListingController,

} = require("../controllers/ListingController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/public/uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), createListingController);


module.exports = router;
