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
const { composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const Team = require('./models/team');

api = 'https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED';
url = 'http://api.football-data.org/v2/teams/';
teamsUrl = 'http://api.football-data.org/v2/competitions/CL/teams';
xAuthToken = '440244150fc84a82b3174d238d6d6659';

options = {
  url: this.api,
  dataType: 'json',
  type: 'GET',
  headers: { 'x-auth-token': this.xAuthToken }
};

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

app.post('/teamPic', (req, res, next) => {
  Team.findOne({teamID: req.body.teamID})
  .then( team => {
    if (!team){
      return res.status(401).json({
        message: 'ID not recognized'
      });
    };
    console.log('Image sent')
    res.status(200).json({
      Message: 'Team found',
      crest: team.teamCrest
    })
  })
  .catch(err => {
    return res.status(401).json({
      message: err });
  })

})

app.post('/team', (req, res, next) => {
  const team = new Team({
    teamID: req.body.teamID,
    teamCrest: req.body.teamCrest
  })
  console.log('Team: ', team)
  team.save().then( result =>{
    res.status(200).json({
      message: "Team added",
      result: result,
      id: team.teamID,
      crest: team.teamCrest
    });
  })

})
module.exports = app
