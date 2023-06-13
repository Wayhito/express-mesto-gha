const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  about: {
    type: String,
    // default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
    // default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
