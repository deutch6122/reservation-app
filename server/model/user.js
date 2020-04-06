const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  // author: ObjectId,
  username: {
    type: String,
    required: true,
    max:[60, 'ユーザー名は最大60文字までです。']
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    max:[60, 'e-mailは最大60文字までです。']
  },
  password: {
    type: String,
    required: true,
    min:[8, 'passwordは8文字以上です。'],
    max:[30, 'passwordは最大30文字までです。']
  }
})

UserSchema.methods.hassamePassword = function(imputPassword) {
  const user = this
  return bcrypt.compareSync(imputPassword, user.password)
}

UserSchema.pre('save', function(next) {
  const user = this
  const saltRounds = 10

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash
      next()
    });
});
})

module.exports = mongoose.model('User', UserSchema)
