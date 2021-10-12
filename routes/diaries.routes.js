module.exports = app => {
    const diaries = require("../controllers/diaries.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new owner
    router.post("/", diaries.create);
  
    // Retrieve all owners
    router.get("/", diaries.findAll);
    
    // Retrieve a single owners with id
    router.get("/:id", diaries.findOne);
  
    // Update a owners with id
    router.put("/:id", diaries.update);
    
    app.use('/api/diaries', router);
  };