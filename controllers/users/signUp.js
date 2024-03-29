const { User } = require("../../models/User");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = new User({
    username,
    email,
    avatarURL: null,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3030/api/users/verify/${verificationToken}">Please confirm your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    message: "You have been successfully registered",
  });
};

module.exports = signUp;
