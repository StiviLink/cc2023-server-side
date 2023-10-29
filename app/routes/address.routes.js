const address = require("../controllers/address.controller")
module.exports = app => {
    const router = require("express").Router()
    // Create a new Address
    router.post("/", address.createAddress)
    // Retrieve all Address
    router.get("/", address.findAllAddress)
    // Retrieve a single Address with id
    router.get("/:id", address.findOneAddress)
    // Update an Address with id
    router.patch("/:id", address.updateAddress)
    // Delete an Address with id
    router.delete("/:id", address.deleteAddress)
    // Create a new Address
    router.delete("/", address.deleteAllAddress)
    app.use('/api/address', router)
}