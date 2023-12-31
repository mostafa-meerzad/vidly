require("express-async-errors")
// const asyncMiddleware = require('../middleware/async') //use express-async-errors instead of our custom error handler

const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genres");
const auth = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");


router.get(
  "/",
  async (req, res) => {
    const result = await Genre.find();
    res.send(result);
  })
;

router.get("/:id",async (req, res) => {
  // find the genre
  try {
    const result = await Genre.find({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    res.status(400).send("invalid id");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  //
  const genre = await Genre.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name }
  );
  if (!genre) return res.status(404).send("no such genre");
  // genre.set({name: req.body.name})

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });

  genre = await genre.save();

  res.send(genre);
});
// we can pass multiple middleware function to a single route by putting them in an array
router.delete("/:id", [auth, isAdmin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove({ _id: req.params.id });

  res.send(genre);
});

module.exports = router;
