/*eslint-env es6*/
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const teamSchema = mongoose.Schema({
  teamID: {type: String, required: true, unique: true},
  teamCrest: { type: String},
});

teamSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Team", teamSchema);
