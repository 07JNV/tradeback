var express = require("express");
var route = express.Router();
var cors = require("cors");
var User = require("../models/users");




const {signup, signin,buy,buyg} = require("../controllers/auth.controllers.js");


route.post("/signup",signup);
route.post("/signin",signin);
route.post("/buy",buy);
route.get("/buy",buyg);






module.exports = route;