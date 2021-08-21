/*eslint-env es6*/
const User = require('../models/user')
const dotenv = require('dotenv').config();
const user = require('../models/user');

// USER SIGNUP
exports.signup = function(req, res, next) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
  });
  user
    .save()
    .then(result => {
      res.status(201).json({
        email: user.email,
        result: result,
        Message: ('Saved')
      });
    })
    .catch(err => {
      res.status(500);
      console.log(err)
    })
}
