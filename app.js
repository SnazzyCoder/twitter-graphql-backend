const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb+srv://mohit:Mohit123@cluster0.crwnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

app.use(cors())

mongoose.connection.once('open', () => {
    console.log("Mongoose Connected")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen('4003', () => {
    console.log("Listening on 4003")
})