/*eslint-env es6*/
const User = require('../models/user')
const loggedUser = null

exports.login = function(req, res, next) {
  User.findOne({email: req.body.email})
  .then( user => {
    if (!user){
      return res.status(401).json({
        message: 'Email not recognized'
      });
    };
    loggedUser = user
    console.log(user)
    return res.status(400).json({
      message: 'Logged in'
    })
  })
  .catch(err => {
    return res.status(401).json({ message: err });
    console.log(err)
  })
}
