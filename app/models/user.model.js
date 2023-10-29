//USER
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: {type: String, required: true},
            email: {type: String, required: true, unique: true},
            phone: String,
            role: String,
            status: String,
            isVerified: Boolean,
            addressIds: [String],
            password: String,
            idConnexion: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    });
    return mongoose.model("user", schema)
}