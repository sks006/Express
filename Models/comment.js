// post,user ,body, replies
const { Schema, model } = require("mongoose")
    // const post = require("./post")
    // const user = require("./User")
const commentSchema = new Schema({

    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    replies: [{
        body: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date()
        }

    }]
}, { timestamps: true })

const comment = model("comment", commentSchema)
module.exports = comment