const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb://localhost:27017', {
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