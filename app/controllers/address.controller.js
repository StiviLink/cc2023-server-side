const db = require("../models")
const Address = db.address
// Create and Save a new address
exports.createAddress = (req, res) => {
    // Validate request
    if (!req.body.country || !req.body.city || !req.body.address) {
        res.status(400).send({ message: "Content can not be empty!" })
        return;
    }
    // Create an Address
    const address = new Address({
        country: req.body.country,
        city: req.body.city,
        zipCode: req.body.zipCode,
        state: req.body.state,
        address: req.body.address
    })
    // Save Address in the database
    address
        .save(address)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Address."
            })
        })
}
// Retrieve all Address from the database.
exports.findAllAddress = (req, res) => {
    const country = req.query.country
    const city = req.query.city
    const zipCode = req.query.zipCode
    const condition = country ? { country: { $regex: new RegExp(country), $options: "i" } } :
        city ? { city: { $regex: new RegExp(city), $options: "i" } } :
            zipCode ? { zipCode: zipCode } : {}
    Address.find(condition)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Address."
            })
        })
}
// Find a single Address with an id
exports.findOneAddress = (req, res) => {
    const id = req.params.id;
    Address.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Address with id " + id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Address with id=" + id });
            throw err
        })
}
// Update an Address by the id in the request
exports.updateAddress = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        })
    }
    const id = req.params.id;
    Address.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Address with id=${id}. Maybe Address was not found!`
                })
            } else res.send({ message: "Address was updated successfully." })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Address with id=" + id
            });
            throw err;
        });
};
// Delete an Address with the specified id in the request
exports.deleteAddress = (req, res) => {
    const id = req.params.id;
    Address.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Address with id=${id}. Maybe Address was not found!`
                });
            } else {
                res.send({
                    message: "Address was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Address with id=" + id
            })
            throw err
        })
}
// Delete all Address from the database.
exports.deleteAllAddress = (req, res) => {
    Address.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Address were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Address."
            })
        })
}