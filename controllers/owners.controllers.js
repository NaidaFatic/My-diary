const db = require("../models");
const bcrypt = require('bcrypt');
const config = require("../config/env.config.js");
const Owners = db.owners;


// Create a new Owner
exports.create = (req, res) => {
  const salt = bcrypt.genSaltSync(config.salt);
  const hash = bcrypt.hashSync(req.body.password, salt);

   // Validate request
  if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
    res.status(400).write({ message: "Content can not be empty!" });
    return;
  }
  else { //have some error : UnhandledPromiseRejectionWarning, cannot solve!!
    Owners.findOne({email: req.body.email})
      .then(data => {
      if (data)
        res.status(404).send({ message: "Email already in use! email : " + req.body.email });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving profiles with email: Error => " + err  });
    });
  }

  // Create a owner
  const owner = new Owners({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password : hash,
    age: req.body.age,
    comment: req.body.comment
  });  
     
   
  // Save Tutorial in the database
  owner
    .save(owner)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the profile."
      });
    });
};

// Retrieve all Owners from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    
    Owners.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving owners."
        });
      });
};

// Find a single Owners with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Owners.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found profiles with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving profiles with id=" + id });
      });
};

// Find a single Owners with an name

exports.login = (req, res) => {
    const emailReq = req.body.email;
    const passwordReq = req.body.password;

    Owners.findOne({email : emailReq})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found profiles with email " + emailReq });
        else {
          bcrypt.compare(passwordReq, data.password).then(function(result) {
            if(result) 
              res.send(data);
            else res.status(404).send({ message: "Not found profiles with this email and password" });
        });
       }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving profiles with email: Error => " + err  });
      });
};

// Update a Owner by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Owners.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update profile with id=${id}. Maybe profile was not found!`
            });
          } else res.send({ message: "Profile was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Profile with id=" + id
          });
        });
};

// Delete a Owner with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Owners.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete profile with id=${id}. Maybe profile was not found!`
          });
        } else {
          res.send({
            message: "Profile was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Owners with id=" + id
        });
      });
};


