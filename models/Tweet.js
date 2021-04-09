const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    author: String,
    title: String,
    content: String
})

module.exports = mongoose.model('author', TweetSchema)