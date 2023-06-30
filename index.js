const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

const movies = [
  {
    name: "movie1",
    genre: "action",
    id: 1,
  },
  {
    name: "movie2",
    genre: "drama",
    id: 2,
  },
  {
    name: "movie3",
    genre: "comedy",
    id: 3,
  },
];

app.get("/", (req, res) => {
  res.send("vidly movie renting service");
});

app.get("/vidly/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/vidly/api/movies/:movieName", (req, res) => {
  // find the movie
  const movie = movies.find((m) => m.name === req.params.movieName);
  // send the movie
  if (!movie) {
    return res.status(404).send("movie with the provided name not found");
  }
  res.send(movie);
});

app.post("/vidly/api/movies", (req, res) => {
  // validate the sent movie
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    genre: Joi.string().required().min(3),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // create the movie
  const movie = value;
  movie.id = movies.length + 1;

  // add to collection
  movies.push(movie);

  res.send(movie);
  // respond back
});

app.put("/vidly/api/movies/:movieName", (req, res) => {
    // validate the sent value
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    genre: Joi.string().required().min(3),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // find the movie
  const movie = movies.find((m) => m.name === req.params.movieName);
  if (!movie) return res.status(404).send("movie not found");
  // update the movie
  const index = movies.indexOf(movie);
  movies[index] = movie;

  //respond back
  res.send(movie);
});


app.delete("/vidly/api/movies/:movieName", (req, res)=>{
    // find the movie
    const movie = movies.find(m=>m.name === req.params.movieName);
    if(!movie) return res.status(404).send("no such movie")

    // delete the movie from collection
    movies.splice(movies.indexOf(movie), 1)
    res.send(movie);
})


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log("listening on port: ", port)
})