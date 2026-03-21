const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

module.exports = function () {
  router.post("/signup",(req, res) =>  userController.signUpuser(req, res));
  router.post("/signin",(req, res) => userController.signInUser(req, res));
  router.get("/getLocations",(req, res) => userController.getAllLocations(req, res));
  return router;
}
