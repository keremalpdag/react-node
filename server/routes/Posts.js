const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const posts = await Posts.findAll({where: {username: username}, include: [Likes]});
  res.json(posts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  await Posts.create(post);
  res.json(post);
});

router.put("/title", validateToken, async (req, res) => {
  const {title, id} = req.body;
  await Posts.update({title: title}, {where:{id:id}});
  res.json(title);
});

router.put("/posttext", validateToken, async (req, res) => {
  const {postText, id} = req.body;
  await Posts.update({postText : postText}, {where: {id:id}});
  res.json(postText);
});

router.delete("/:id", validateToken, async (req, res) => {
  const postId = req.params.id;

  await Posts.destroy({
    where: {
      id: postId,
    }
  });

  res.json("deleted");
})

module.exports = router;
