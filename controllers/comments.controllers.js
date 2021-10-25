const db = require("../models");
const Comments = db.comments;
const Posts = db.posts;

// Create a new post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.ownerID) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const comment = new Comments({
        description: req.body.description,
        postID : req.params.postID, //TODO check if the user exists
        ownerID : req.body.ownerID
    });

    // Save comment in the database
    comment
        .save(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the comment."
            });
        });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {

    //todo pagination
    Comments.find().sort({
            'createdAt': 1
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });
};

// Find a posts by post with an id
exports.findByPost = (req, res) => {
    const id = req.params.id;
    var post_id;

    //find diaryID
    Posts.findById(id)
        .then(data => {
            post_id = data.id;
            Comments.find({
                    postID: post_id
                })
                .then(data => {
                    if (!data)
                        res.status(404).send({
                            message: "Not found comments with post_id " + post_id
                        });
                    else res.send(data);
                })
                .catch(err => {
                    res
                        .status(500)
                        .send({
                            message: "Error retrieving comments with post_id " + post_id
                        });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });
};

// Find a comment by an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comments.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found comment with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving comment- with id " + id
                });
        });
};


// Update a comment by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Comments.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update comment with id=${id}. Maybe comment was not found!`
                });
            } else res.send({
                message: "Comment was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating comment with id=" + id
            });
        });
};

// Delete a comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Comments.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete comment with id=${id}. Maybe comment was not found!`
                });
            } else {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete comment with id=" + id
            });
        });
};

//replys