const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../middlewares");
const { joiSchema } = require("../models/User");
const { updateSubscriptionValidation } = require("../schemas");
const { users: ctrl } = require("../controllers");
const { User } = require("../models/User");

const router = express.Router();

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.get("/all", ctrlWrapper(ctrl.getAll));
router.patch(
  "/",
  auth,
  validation(updateSubscriptionValidation),
  ctrlWrapper(ctrl.subscriptionChange)
);
router.put(
  "/avatars",
  auth,
  upload.single("avatarURL"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
