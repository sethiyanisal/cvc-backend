const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
};

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

const signInUser = async(req,res) => {
  const {email, password} = req.body

  try {
    if (!email || !password) {
      return res.send({
        error: true,
        message: 'All fields must be filled',
      });
    }
  
    try {
      await User.signInUser(email, password).then(async (user) =>{
        if (user) {
              const token = createToken(user.user_id);
              const id = user.user_id;
              const role = user.role;
              return res.send({
                error: false,
                user: {email,token,id,role},
                message: 'succsessfully logged in',
              });
            }
            return res.send({
              error: true,
              message: 'Incorrect password',
            });
          })            
    } catch (error) {
      return res.send({
        error: true,
        message: 'Invalid credentials',
      }); 
    }

  } catch (error) {
    return res.send({
      error: true,
      message: 'something went wrong',
    });
  }
}

const getAllLocations = async(req, res) => {
  
    try {
      await User.getAllLocations(res).then((locations) =>{
            if (locations) {
                return res.send({
                error: false,
                locations: locations,
                message: 'succsessfully locations received',
              });
            }
          })
        }
          
    catch (error) {
      return res.send({
        error: true,
        message: 'Internal server error',
      }); 
    }
  }

module.exports = {
    signUpuser,
    signInUser,
    getAllLocations
}