const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

module.exports = function () {
  router.post("/signup",(req, res) =>  userController.signUpuser(req, res));
  return router;
}
