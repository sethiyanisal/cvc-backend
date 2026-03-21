const User = require('../models/user.model');

const signUpuser = async (req, res) => {
  try {
        const {firstName, lastName, contactNo, email, password, role, latitude, longitude} = req.body;
        await User.findUser(email, res).then(async () => {
          try {

          const data = {
            firstName:firstName,
            lastName:lastName,
            contactNo:contactNo,
            email: email,
            password: password,
            role: role,
            latitude: latitude,
            longitude: longitude
          };
  
          await User.createUser(data, res);
          } catch (error) {
            res.json({ error: "Internal Server Error!" });
          }
          
          })

    } catch (error) {
      return res.send({
      error: true,
      message: 'User already exists!',
    });
    }
}

module.exports = {
    signUpuser
}