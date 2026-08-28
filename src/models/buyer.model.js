const {db} = require('../config/database');

const addBuyingPrice = (data, res) => {
    const userId = data.user_id;
    const coconutType = data.coconutType;
    const price = data.price;
    const date = data.date;

    const sql = "INSERT INTO buyer_coconut_prices (user_id, coconut_type, price, price_date) VALUES (?, ?, ?, ?)";

    db.query(sql, [userId, coconutType, price, date], (error, results) => {
        if (error) {
            return res.json({ error: "Internal Server Error!" });
        } else {
            return res.send({ success: true, results: results, message: "Price added successfully" });
        }
    });
}

const getBuyingPrices = (req, res) => {

    return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM buyer_coconut_prices WHERE price_date= CURDATE()";
    db.query(sql, (error, results) => {
        if (error) {
            return res.json({ error: "Internal Server Error!" });
        } else if(results && !error) {
            resolve(results);
        } else {
            reject();
        }
    });
    });
};

const updatePrice = (req, res) => {
    const ID = req.ID;
    const price = req.price;

    return new Promise((resolve, reject) => {
    const sql = "UPDATE buyer_coconut_prices SET price = ? WHERE id = ?";

    db.query(sql, [price, ID], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
    });
};


module.exports = {
    addBuyingPrice,
    getBuyingPrices,
    updatePrice
};