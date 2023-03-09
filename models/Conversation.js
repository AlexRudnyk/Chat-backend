const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
