// tittel,body,author,tags,thumnile,readtime,like,dislike,comment
const { Schema, model } = require("mongoose")
    // const user = require("./User")
const comment = require("./comment")

const postSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thubnail: String,
    readTime: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'

    }]

}, { timestamps: true })


const post = model("post", postSchema)
module.exports = post