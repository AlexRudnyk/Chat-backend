const { Auth } = require("../../models/Auth");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await Auth.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = new Auth({ username, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3030/api/auth/verify/${verificationToken}">Please confirm your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    username,
    email,
    subscription: "starter",
    avatarURL,
    verificationToken,
  });
};

module.exports = signUp;
