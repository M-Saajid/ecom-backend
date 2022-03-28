const { items } = require("../config/database");
const { STATUS_MESSAGES } = require("../config/message");
const productValidation = require("../middlewares/productValidation");

const postItem = async (req, res, next) => {
  // posting products to database
  const fileUrl = req.file.path.replace(/\\/g, "/");
  const newItem = new items({
    image: fileUrl,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    quantity: req.body.quantity,
    category: req.body.category
  });
  const data =req.userData
  if(data.username===process.env.ADMIN_ID){
    try {
      const response = await newItem.save();
      res.status(200).send({
        staus: STATUS_MESSAGES.SUCCESS,
        data: {
          response
        }
      });
    } catch (error) {
      res.status(404).send({
        staus: STATUS_MESSAGES.FAIL,
        data: {
          errorMessage: error.message
        }
      });
    }
  }else{
    res.status(401).send({
      staus: STATUS_MESSAGES.FAIL,
      data: {
        errorMessage: "Access denied"
      }
    });
  }

};
module.exports = postItem;
