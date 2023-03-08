const { Auth } = require("../../models/Auth");

const logout = async (req, res) => {
  console.log("REQ AUTH", req.user);
  const { _id } = req.user;
  await Auth.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;
