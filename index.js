
const mongoose = require("mongoose")
const express = require("express");
const app = express();
const genres = require("./routes/genres")
const customer = require("./routes/customer");
const movies = require("./routes/movies");
mongoose.connect("mongodb://127.0.0.1:27017/vidly").then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})


app.use(express.json());
app.use("/vidly/api/genres", genres)
app.use("/vidly/api/customers", customer)
app.use("/vidly/api/movies", movies)

app.get("/", (req, res) => {
  res.send("vidly movie renting service");
});


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log("listening on port: ", port)
})