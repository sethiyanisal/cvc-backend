const {db} = require('../config/database');

const addPlanterPrice = (data, res) => {
    const id = data.user_id;
    const coconutType = data.coconutType;
    const amount = data.amount;
    const price = data.price;
    const date = data.date;

    const sql = "INSERT INTO p_daily_prices (user_id, coconut_type, unit_price, coconut_count, entry_date) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [id, coconutType, price, amount, date], (error, results) => {
    if (error) {
      return res.json({ error: "Internal Server Error!" });
    } else {
      return res.send({ success: true, results: results, message: "Price added successfully" });
    }
  });
}

const getTodayPrice = (req, res) => {
    const ID = req.params.id;

    return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM p_daily_prices WHERE entry_date = CURDATE() AND user_id = ?";
      db.query(sql, [ID], (error, results) => {
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
    const amount = req.count;

    return new Promise((resolve, reject) => {
    const sql = "UPDATE p_daily_prices SET unit_price = ?, coconut_count = ? WHERE id = ?";
      db.query(sql, [price, amount, ID], (error, results) => {
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
    addPlanterPrice,
    getTodayPrice,
    updateTodayPrice
}