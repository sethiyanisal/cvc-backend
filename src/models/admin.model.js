const {db} = require('../config/database');

const addAdminPrice = (data, res) => {
    const coconutType = data.coconutType;
    const priceType = data.priceType;
    const price = data.price;
    const date = data.date;

    const sql = "INSERT INTO admin_coconut_prices (coconut_type, price_type, price, price_date) VALUES (?, ?, ?, ?)";

    db.query(sql, [coconutType, priceType, price, date], (error, results) => {
        if (error) {
            return res.json({ error: "Internal Server Error!" });
        } else {
            return res.send({ success: true, results: results, message: "Price added successfully" });
        }
    });
}

const getPrices = (req, res) => {
    const sql = "SELECT * FROM admin_coconut_prices WHERE price_date BETWEEN DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)";

    return new Promise((resolve, reject) => { 
        db.query(sql, (error, results) => {
            if (error) throw error;
            if (results && !error) {
                resolve(results);
            } else {
                reject();
            }
        });
    });
}

const updateTodayPrice = (req, res) => {
    const ID = req.ID;
    const price = req.price;

    return new Promise((resolve, reject) => {
    const sql = "UPDATE admin_coconut_prices SET price = ? WHERE id = ?";
      db.query(sql, [price, ID], (error, results) => {
        if (error) throw error;
        if (results && !error) {
          resolve(results);
        } else {
          reject();
        }
      });
  });
}


module.exports = {
    addAdminPrice,
    getPrices,
    updateTodayPrice
};