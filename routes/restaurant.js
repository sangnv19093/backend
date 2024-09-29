var express = require("express");
var router = express.Router();
var restaurant = require("../controllers/restautant.controller");

router.get("/listrestaurant",restaurant.searchRestaurant);
router.get("/listrestaurant/search", restaurant.searchRestaurant);

module.exports = router;
