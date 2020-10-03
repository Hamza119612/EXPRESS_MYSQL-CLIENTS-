const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.fname && !req.body.lname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a CLient
  const client = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    tel: req.body.tel,
   
  };

  // Save CLient in the database
  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CLient."
      });
    });
};

// Retrieve all CLients from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Client.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Clients."
      });
    });
};

// Find a single CLient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving CLient with id=" + id
      });
    });
};

// Update a CLient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Client.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
};

// Delete a CLient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Client.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete CLient with id=${id}. Maybe CLient was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete CLient with id=" + id
      });
    });
};


