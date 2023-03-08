const { Auth } = require("../../models/Auth");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized(
      "Email is wrong or not verified, or password is wrong"
    );
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await Auth.findByIdAndUpdate(user._id, { token });
  const { subscription } = user;
  res.json({
    token,
    email,
    subscription,
  });
};

module.exports = login;
