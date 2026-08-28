const express = require("express");
const router = express.Router();
const buyerController = require('../controllers/buyer.controller');

module.exports = function () {
  router.post("/AddBuyingPrice",(req, res) =>  buyerController.addBuyingPrice(req, res));
    router.get("/GetBuyingPrices",(req, res) =>  buyerController.getBuyingPrices(req, res));
    router.put("/UpdatePrice/:id",(req, res) =>  buyerController.updatePrice(req, res));
    
  return router;
}