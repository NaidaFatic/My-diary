const db = require("../models");
const Diaries = db.diaries;


// Create a new diary
exports.create = (req, res) => {

  // Validate request
  if (!req.body.ownerID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a diary
  const diary = new Diaries({
    ownerID: req.body.ownerID
  });

  Diaries.find({
      ownerID: req.body.ownerID
    })
    .then(data => {
      // Save diary in the database
      diary
        .save(diary)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the diary."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving diary."
      });
    });


};

// Retrieve all diary from the database.
exports.findAll = (req, res) => {
  Diaries.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving diaries."
      });
    });
};

// Find a single diary with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Diaries.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found diary with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving diary with id=" + id
        });
    });
};

// Find a diary by owner
exports.findByOwner = (req, res) => {

  Diaries.find({ownerID : req.params.id})
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found diary with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving diary with owner id=" + id
        });
    });
};

// Update a diary by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Diaries.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update diary with id=${id}. Maybe profile was not found!`
        });
      } else res.send({
        message: "Diary was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Diary with id=" + id
      });
    });
};