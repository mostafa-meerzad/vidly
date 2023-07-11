const express = require("express");
const {validate, Rental} = require("../models/rentals");
const {User} = require("../models/customer");
const {Movie} = require("../models/movies");
const router = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
Fawn.init("mongodb://127.0.0.1:27017/vidly");
let task = Fawn.Task();

router.get("/", async (req, res) => {
    const rentals = await Rental.find().sort("-dateOut");
    res.send(rentals);
});

router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await User.findById(req.body.customerId);
    if (!customer) return res.status(400).send("invalid customer");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("invalid movie");

    if (movie.numberInStock === 0)
        return res.status(400).send("movie not in stock");

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
    });

    // rental = await rental.save();
    // movie.numberInStock--
    // await movie.save()
    // res.send(rental)

    // the following code is outdated if you ever need to use transactions in mongodb consider an update
    try {
        // task
        // .update("rentals", { rental: rental })
        // .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
        // .run();
        // res.send(rental);
        // console.log(task);
         task.save("rentals", rental)
            .update("movies", {_id: movie._id}, {$inc: {numberInStock: -1}})
            .run()
        res.send(rental)
    } catch (err) {
        res.status(500).send("something failed");
    }
    res.end()
});

module.exports = router;
