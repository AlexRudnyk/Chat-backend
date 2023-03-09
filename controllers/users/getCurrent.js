const getCurrent = async (req, res) => {
  const { _id, username, email, subscription } = req.user;
  res.status(200).json({
    id: _id,
    username,
    email,
    subscription,
  });
};

module.exports = getCurrent;
