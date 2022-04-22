const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: { 
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExpiry: {
    type: Number
  }
});

userSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    // 저장하기 전에 password 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err)
        user.password = hash;
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

userSchema.methods.generateToken = function(callback) {
  let user = this;
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save((err, user) => {
    if (err) return callback(err);
    callback(null, user);
  })
}

userSchema.statics.findByToken = function(token, callback) {
  let user = this;
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음 
    // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
    User.findOne({"_id": decoded, "token": token }, function(err, user) {
      if (err) return callback(err);
      callback(null, user);
    })
  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };
