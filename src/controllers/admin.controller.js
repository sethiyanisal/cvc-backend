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

const updateTodayPrice = async (req, res) => {
    const { price} = req.body;
    const ID = req.params.id;

    try {
        const data = {
                price,
                ID
            }

        await Admin.updateTodayPrice(data, res).then((data) =>{
            if (data) {
                return res.send({
                error: false,
                data: data,
                message: 'succsessfully price updated',
              });
            }
          })
    } catch (error) {
        return res.send({
            error: true,
            message: 'Internal server error',
          }); 
    }
}

module.exports = {
    addAdminPrice,
    getPrices,
    updateTodayPrice
};