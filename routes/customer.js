const express = require("express");
const router = express.Router();

const {User, validate} = require("../models/customer");

router.get("/", async (req, res) => {
  const result = await User.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await User.findById({ _id: req.params.id });
  res.send(result);
});

router.post("/", async (req, res) => {
  // validate user input
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  // make a new user
  let user = new User({
    name: req.body.name,
    phone: req.body.phone,
    isGold:req.body.isGold
  });
  // save user to the database
  user = await user.save();
  // send respond to user
  res.send(user);
});

router.put("/:id", async (req, res) => {
  // validate the input
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  // find the user
  const user = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, phone: req.body.phone, isGold:req.body.isGold }, {new:true}
  );
  if (!user) return res.status(404).send("No user with that id");
  res.send(user);
});

router.delete("/:id", async (req, res)=>{
 const user = await User.findByIdAndRemove({_id: req.params.id})

 res.send(user)

})

module.exports = router;
