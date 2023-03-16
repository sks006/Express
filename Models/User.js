// name ,emaill,password& profileId
const { Schema, model } = require("mongoose")
    // const profile = require("./profile")
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        mixlength: 15
    },
    email: {

        type: String,
        trim: true,
        required: true

    },
    password: {

        type: String,
        required: true,
        minlength: 9,
        mixlength: 30,
    },
    confirmPassword: {

        type: String,
        // required: true,

    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
    }


}, {
    timestamps: true
})
const User = model("User", userSchema)
module.exports = User