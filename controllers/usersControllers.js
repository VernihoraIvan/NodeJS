const User = require("../db/models/userModels");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "user already exist" });
    return;
  }

  const avatarUrl = gravatar.url(email);
  const newUser = new User({
    name,
    email,
    password,
    avatarUrl,
  });

  await newUser.hashPassword(password);

  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({ user: { name, email, avatarUrl }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const isValidPAssword = await user.comparePassword(password);
  if (!isValidPAssword) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: { name: user.name, email, avatarUrl: user.avatarUrl },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

const current = (req, res) => {
  const { name, email, avatarUrl } = req.user;

  res.json({ name, email, avatarUrl });
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;

  const avatarDir = path.join(__dirname, "../", "public", "avatars");

  const resultUpload = path.join(avatarDir, fileName);

  await fs.rename(tempDir, resultUpload);

  const avatarUrl = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({ avatarUrl });
};

module.exports = { addUser, login, logout, current, updateAvatar };
