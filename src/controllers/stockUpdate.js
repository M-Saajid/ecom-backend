const { STATUS_MESSAGES } = require("../config/message");
const { items } = require("../config/database");

const update = async (req, res) => {
  try {
    const result = await items.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { quantity: -1 } }
    );
    res.status(200).send({
      staus: STATUS_MESSAGES.SUCCESS,
      data: {
        result
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      staus: error.message
    });
  }
};

module.exports = update;
