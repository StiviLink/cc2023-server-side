const user = require("../controllers/user.controller.js")
module.exports = app => {
    const router = require("express").Router()
    // Create a new User
    router.post("/", user.createUser)
    // Retrieve all Users
    router.get("/", user.findAllUser)
    // Retrieve a single User with id
    router.get("/:id", user.findOneUser)
    // Update a User with id
    router.patch("/:id", user.updateUser)
    // Delete a User with id
    router.delete("/:id", user.deleteUser)
    // Delete all users
    router.delete("/", user.deleteAllUser)
    app.use('/api/user', router)
}