const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email provided'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 6,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// userSchema.pre('findOneAndUpdate', async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email });
  if (!user) throw Error('Invalid email: Not found');

  const samePassword = await bcrypt.compare(password, user.password);
  if (!samePassword) throw Error('Invalid email or password');

  return user;
};

module.exports = mongoose.model('User', userSchema);
