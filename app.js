const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/users");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
