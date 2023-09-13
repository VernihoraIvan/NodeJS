const express = require("express");

const authRouter = express.Router();
const {
  addUser,
  login,
  current,
  logout,
  updateAvatar,
} = require("../controllers/usersControllers");
const authenticate = require("../middlewares/authentificate");

const upload = require("../middlewares/upload");
authRouter.post("/register", addUser);

authRouter.post("/login", login);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, current);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = authRouter;
