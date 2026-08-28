const Buyer = require("../models/buyer.model");

const addBuyingPrice = async (req, res) => {
    const {user_id, coconutType, price, date} = req.body;
    try {
        const data = {
            user_id,
            coconutType,
            price,
            date
        };
        await Buyer.addBuyingPrice(data, res);
    } catch (error) {
        console.error("Error adding buying price:", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const getBuyingPrices = async (req, res) => {
    try {
        await Buyer.getBuyingPrices(req, res).then((prices) => {
            return res.send({ success: true, results: prices, message: "Prices retrieved successfully" });
        });
    } catch (error) {
        console.error("Error retrieving buying prices:", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const updatePrice = async (req, res) => {
    const {price} = req.body;
    const ID = req.params.id;

    try {
        const data = {
                price,
                ID
            }

        await Buyer.updatePrice(data, res).then((data) =>{
            if (data) {
                return res.send({
                error: false,
                data: data,
                message: 'succsessfully price updated',
              });
            }
            })
    } catch (error) {
        console.error("Error updating price:", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

module.exports = {
    addBuyingPrice,
    getBuyingPrices,
    updatePrice
};   