const express = require("express")
const router = express.Router()
const {Genre, validate} = require("../models/genres")
router.get('/', async (req, res) => {
    const result = await Genre.find()
    res.send(result)

})

router.get("/:id", async (req, res) => {
    // find the genre
    const result = await Genre.find({_id: req.params.id})
    res.send(result)
})

router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)
    //
    const genre = await Genre.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name})
    if (!genre) return res.status(404).send("no such genre")
    // genre.set({name: req.body.name})

    res.send(genre)
})

router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)
    let genre = new Genre({name: req.body.name})

    genre = await genre.save()

    res.send(genre)
})

router.delete("/:id", async (req, res) => {
    const genre = await Genre.findByIdAndRemove({_id: req.params.id})

    res.send(genre)
})

module.exports = router