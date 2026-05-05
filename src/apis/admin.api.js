const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin.controller');

module.exports = function () {
  router.post("/AddPrice",(req, res) =>  adminController.addAdminPrice(req, res));
  router.get("/GetPrices",(req, res) =>  adminController.getPrices(req, res));
  router.put("/UpdatePrice/:id",(req, res) =>  adminController.updateTodayPrice(req, res));

  return router;
}