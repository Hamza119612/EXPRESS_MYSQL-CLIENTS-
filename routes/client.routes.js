module.exports = app => {
    const clients = require("../controllers/clients.controller");

    var router = require("express").Router();

    // Create a new CLient
    router.post("/", clients.create);
  
    // Retrieve all CLients
    router.get("/", clients.findAll);
  
 
  
    // Retrieve a single CLient with id
    router.get("/:id", clients.findOne);
  
    // Update a CLient with id
    router.put("/:id", clients.update);
  
    // Delete a CLient with id
    router.delete("/:id", clients.delete);

  
    app.use('/api/clients', router);
}