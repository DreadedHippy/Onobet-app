/*eslint-env es6*/
const express = require('express');
const signup = require('./routes/signup')
const login = require('./routes/login')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const User = require('./models/user')
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const  { composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Hello'
  })
});

//MONGOOSE CONNECTION
mongoose
  .connect( process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true,})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
});

app.post('/users/signup', signup.signup);
app.post('/users/login', login.login)


module.exports = app
