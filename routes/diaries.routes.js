module.exports = app => {
  const diaries = require("../controllers/diaries.controllers.js");

  var router = require("express").Router();

  // Create a new owner
  router.post("/", diaries.create);

  // Retrieve all owners
  router.get("/", diaries.findAll);

  // Retrieve a single owners with id
  router.get("/:id", diaries.findOne);

  // Retrieve a owners diaries with id
  router.get("/owner/:id", diaries.findByOwner);

  // Update a owners with id
  router.put("/:id", diaries.update);

  app.use('/api/diaries', router);
};