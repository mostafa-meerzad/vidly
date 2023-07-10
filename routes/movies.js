const express = require("express");
const router = express.Router();
const { validator, Movie } = require("../models/movies");
const { Genre } = require("../models/genres");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send("Invalid genre");

  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    // genre:genre ,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
  });

  const result = await movie.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send("Invalid genre");

  const movie = await Movie.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      // genre:genre ,
      genre: {
        _id: genre.id,
        name: genre.name,
      },
    }
  );
  if (!movie) return res.status(400).send("no movie");

  const result = await movie.save()
  res.send(result);
});


router.delete("/:id", async (req, res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(400).send("no movie with that id")
    res.send(movie)
})

module.exports = router;
