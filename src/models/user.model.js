const {db} = require('../config/database');

const createUser = (data, res) => {
  const firstName = data.firstName;
  const lastName = data.lastName;
  const contactNo = data.contactNo;
  const email = data.email;
  const password = data.password;
  const role = data.role;
  const latitude = data.latitude;
  const longitude = data.longitude;
  
  const sql = "INSERT INTO users (first_name, last_name, contact_number, email, password_hash, role, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, contactNo, email, password, role, latitude, longitude], (error, results) => {
    if (error) {
      return res.json({ error: "Internal Server Error!" });
    } else {
      return res.send({ success: true, results: results, message: "User registered successfully" });
    }
  });
};

const findUser = (email, res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email=?";
      db.query(sql, email, (error, results) => {
        if (error) throw error;

        if (results.length === 0 && !error) {
          resolve();
        } else {
          reject();
        }
      });
  });
};


module.exports = {
  createUser,
  findUser
}