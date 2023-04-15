const { User } = require("../../models/User");

const getAll = async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
};

module.exports = getAll;
