module.exports = app => {
    const comments = require("../controllers/comments.controllers.js");

    var router = require("express").Router();

    // Create a new comment
    router.post("/:postID", comments.create);

    // Retrieve all comments
    router.get("/", comments.findAll);

    // Retrieve a single comment with id
    router.get("/:id", comments.findOne);

    // Retrieve a comments by one owner with id
    router.get("/post/:id", comments.findByPost);
   
    // Update a comment with id
    router.put("/:id", comments.update);

    // Delete a comment with id
    router.delete("/:id", comments.delete);

    app.use('/api/comments', router);
};