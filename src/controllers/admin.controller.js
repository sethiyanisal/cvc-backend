const Admin = require('../models/admin.model');

const addAdminPrice = async (req, res) => {
    const {coconutType, priceType, price, date} = req.body;
    try {
        const data = {
            coconutType,
            priceType,
            price,
            date
        };

        console.log(data);
        await Admin.addAdminPrice(data, res);
    } catch (error) {
        console.error("Error adding admin price:", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const getPrices = async(req, res) => {
    try {
      await Admin.getPrices(req, res).then((prices) =>{
        res.send({ success: true, results: prices, message: "Prices retrieved successfully" });
      });
    } catch (error) {
        console.error("Error retrieving prices:", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

module.exports = {
    addAdminPrice,
    getPrices
};