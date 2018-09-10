const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {type: String, required: true}
});

UserSchema.methods.serialize = function() {
  return {
    firstname: this.firstName,
    lastName: this.lastName,
    username: this.username,
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };