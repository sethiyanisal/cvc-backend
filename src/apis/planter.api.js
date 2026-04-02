const express = require("express");
const router = express.Router();
const planterController = require('../controllers/planter.controller');

module.exports = function () {
  router.post("/AddPrice",(req, res) =>  planterController.addPlanterPrice(req, res));
  router.get("/GetTodayPrice/:id",(req, res) =>  planterController.getTodayPrice(req, res));
  router.put("/UpdatePrice/:id",(req, res) =>  planterController.updateTodayPrice(req, res));
  return router;
}