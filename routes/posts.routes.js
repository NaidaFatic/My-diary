module.exports = app => {
    const posts = require("../controllers/posts.controllers.js");

    var router = require("express").Router();

    // Create a new post
    router.post("/", posts.create);

    // Retrieve all posts
    router.get("/", posts.findAll);

    // Retrieve a single post with id
    router.get("/:id", posts.findOne);

    // Retrieve a posts by one owner with id
    router.get("/owner", posts.findByOwner);

    // Update a post with id
    router.put("/:id", posts.update);

    // Update a posts like with id
    router.put("/likes/:id", posts.likes);

    // Delete a post with id
    router.delete("/:id", posts.delete);

    app.use('/api/posts', router);
};