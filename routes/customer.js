const express = require("express");
const router = express.Router();

const {Customer, validate} = require("../models/customer");

router.get("/", async (req, res) => {
  const result = await Customer.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await Customer.findById({ _id: req.params.id });
  res.send(result);
});

router.post("/", async (req, res) => {
  // validate user input
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  // make a new user
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold:req.body.isGold
  });
  // save user to the database
  customer = await customer.save();
  // send respond to user
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  // validate the input
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  // find the user
  const user = await Customer.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, phone: req.body.phone, isGold:req.body.isGold }, {new:true}
  );
  if (!user) return res.status(404).send("No user with that id");
  res.send(user);
});

router.delete("/:id", async (req, res)=>{
 const user = await Customer.findByIdAndRemove({_id: req.params.id})

 res.send(user)

})

module.exports = router;
