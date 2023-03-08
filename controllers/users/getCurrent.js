const getCurrent = async (req, res) => {
  const { username, email, subscription } = req.user;
  res.status(200).json({
    username,
    email,
    subscription,
  });
};

module.exports = getCurrent;
