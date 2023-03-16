// user,titte,bio ,profilePic,link{twiter,fb},(like,Comment,post,bookmark
const { Schema, model } = require("mongoose")
const user = require("./User")
const post = require("./post")
const profileSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        trim: true,
        ref: user

    },
    name: {
        type: String,
        trim: true,
        maxlength: 35,
        required: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500

    },

    profilePic: String,
    links: {
        facebook: String,
        twitter: String,
        linkin: String,
        github: String
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: post
    }],
    bookmark: [{
        type: Schema.Types.ObjectId,
        ref: post
    }]


}, { timestamps: true })

const profile = model("profile", profileSchema)
module.exports = profile