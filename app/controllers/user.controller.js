const db = require("../models")
const bcrypt = require("bcrypt")
const User = db.user
// Create and Save a new User
exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.email || !req.body.role) {
        res.status(400).send({ message: "Content can not be empty!" })
        return;
    }
    // Create a User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        status: req.body.status??req.body.isVerified ? 'active' : 'pending',
        isVerified: req.body.isVerified,
        addressIds: req.body.addressIds,
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
        idConnexion: req.body.idConnexion
    })
    // Save User in the database
    user
        .save(user)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            })
        })
}
// Retrieve all User from the database.
exports.findAllUser = (req, res) => {
    const name = req.query.name, email = req.query.email, role = req.query.role,
        idConnexion = req.query.idConnexion, status = req.query.status
    const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } :
        email ? { email: { $regex: new RegExp(email), $options: "i" } } :
            idConnexion ? { idConnexion: { $regex: new RegExp(idConnexion), $options: "i" } } :
                status ? { status: { $regex: new RegExp(status), $options: "i" } } :
                    role ? { role: { $regex: new RegExp(role), $options: "i" } } : {}
    User.find(condition)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            })
        })
}
// Find a single User with an id
exports.findOneUser = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
            throw err
        })
}
// Update a User by the id in the request
exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        })
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                })
            } else res.send({ message: "User was updated successfully." })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
            throw err;
        })
};
// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            })
            throw err
        })
}
// Delete all User from the database.
exports.deleteAllUser = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} User were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all User."
            })
        })
}