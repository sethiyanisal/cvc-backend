const express = require('express');
//const mongoose = require('mongoose');
const dotenv = require('dotenv'); //environmental variables
const cors = require('cors'); //middleware
const bodyParser = require('body-parser');
//const { dbConnect } = require('./src/config/dbConnect'); 
const { db } = require('./src/config/database');

//import APIs
const UserApi = require('./src/apis/user.api');
const PlanterApi = require('./src/apis/planter.api');
const AdminApi = require('./src/apis/admin.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//const PORT = process.env.PORT || 4445;
const DB_PORT = process.env.DB_PORT || 4445;

app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

//register router - CHANGEABLE
app.use('/', UserApi());
app.use('/Planter', PlanterApi());
app.use('/Admin', AdminApi());

//Port listening
app.listen(DB_PORT, () => {
  console.log(`Server is running on port ${DB_PORT}`);
});
