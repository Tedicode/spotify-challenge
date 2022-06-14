const router = require("express").Router();
const database = require("./database.js");

console.log(`the database is ${database[0].name}`);

router.get("/", (req, res) => {
  // retrieve and send back all inventory items (JSON array)
  res.json(database);
  console.log("hi");
});

router.post("/", (req, res) => {
  // accept a request body (req.body)
  const newItem = req.body;
  // const newItem = req.body.json();
  console.log(`req body is ${req.body}`);
  database.push(newItem);
  console.log(`database is now ${database}`);
  // and adds item object to inventory items (JSON array)
});

router.put("/:id", (req, res) => {
  // accepts a req body
  // and will query the JSON array for specific item and edit it
  // (or replace it with the req body's/object's properties)
  // may or may not need this req param ":id"
  // since will have the req body and can use piece of the object
  // to determine which item in JSON array to edit
});
router.delete("/:id", (req, res) => {
  // may actually just be handled the same as the put route
  // because we are not removing items permanently,
  // instead, we mark it "deleted", we can still un-delete
  // and also add 'deletion comments' to that item
  // can change the color to greyed out
  // OR we can take item off the itemsArray and move it to deletedItemsArray
});

module.exports = router;
