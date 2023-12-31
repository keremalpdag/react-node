const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) { res.json({ error: "Wrong Username And Password Combination" }); }
    else {
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      res.json({ token: accessToken, username: username, id: user.id });
    }
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:username", async (req, res) => {
  const username = req.params.username;

  const basicInfo = await Users.findOne({
    where: { username: username },
    attributes: { exclude: ['password'] }
  });

  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.user.username;
  const user = await Users.findOne({ where: { username: username } });
  bcrypt.compare(currentPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password" });
    bcrypt.hash(newPassword, 10).then(async (hash) => {
      await Users.update({ password: hash }, { where: { username: username } });
      res.json("SUCCESS");
    });
  });

});

module.exports = router;
