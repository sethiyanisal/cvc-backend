const Planter = require('../models/planter.model');

const addPlanterPrice = async (req, res) => {
    const {user_id, coconutType, amount, price, date} = req.body;
    try {
        const data = {
            user_id,
            coconutType,
            amount,
            price,
            date
        };

        await Planter.addPlanterPrice(data, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const getTodayPrice = async(req, res) => {
  
    try {
      await Planter.getTodayPrice(req, res).then((price) =>{
            if (price) {
                return res.send({
                error: false,
                price: price,
                message: 'succsessfully price received',
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

const updateTodayPrice = async (req, res) => {
    const { price, count} = req.body;
    const ID = req.params.id;

    try {
        const data = {
                price,
                count,
                ID
            }

            console.log(data);
        await Planter.updateTodayPrice(data, res).then((data) =>{
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
    addPlanterPrice,
    getTodayPrice,
    updateTodayPrice
};