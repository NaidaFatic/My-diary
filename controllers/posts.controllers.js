const db = require("../models");
const config = require("../config/env.config.js");
const Posts = db.posts;
const Diaries = db.diaries;

// Create a new post
exports.create = (req, res, callback) => {
  // Validate request
  if (!req.body.ownerID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //find diaryID
  Diaries.findOne({
      ownerID: req.body.ownerID
    })
    .then(data => {
      // Create a post
      const posts = new Posts({
        name: req.body.name,
        description: req.body.description,
        diaryID: data.id
      });

      // Save post in the database
      posts
        .save(posts)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the profile."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving diary."
      });
    });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {

  //todo pagination
  Posts.find().sort({
      'createdAt': -1
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find a posts by owner with an id
exports.findByOwner = (req, res) => {
  const id = req.body.id;
  var diary_id;

  //find diaryID
  Diaries.findOne({
      ownerID: id
    })
    .then(data => {
      diary_id = data.id;
      Posts.find({
          diaryID: diary_id
        })
        .then(data => {
          if (!data)
            res.status(404).send({
              message: "Not found posts with diary_id " + diary_id
            });
          else res.send(data);
        })
        .catch(err => {
          res
            .status(500)
            .send({
              message: "Error retrieving posts with diary_id " + diary_id
            });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find a posts by an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found posts with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving posts with id " + id
        });
    });
};


// Update a Post by the id in the request
exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Posts.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update post with id=${id}. Maybe post was not found!`
        });
      } else res.send({
        message: "Post was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating post with id=" + id
      });
    });
};

// Delete a Owner with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Posts.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete post with id=${id}. Maybe post was not found!`
        });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete post with id=" + id
      });
    });
};

//add likes