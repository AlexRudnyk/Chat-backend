const { User } = require("../../models/User");

const subscriptionChange = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.status(200).json(result);
};

module.exports = subscriptionChange;
