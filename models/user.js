const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: { validator: (v) => validator.isEmail(v) },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      default: 'Жак-Ив Кусто',
    },

    about: {
      type: String,
      default: 'Исследователь',
    },

    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: { validator: (v) => validator.isURL(v) },
    },
  },

  {
    versionKey: false,
    // statics: {
    //   findUserByCredentials(email, password) {
    //     return this
    //       .findOne({ email })
    //       .select('+password')
    //       .then((user) => {
    //         if (user) {
    //           return bcrypt.compare(password, user.password)
    //             .then((matched) => {
    //               if (matched) return user;

    //               return Promise.reject();
    //             });
    //         }

    //         return Promise.reject();
    //       });
    //   },
    // },
  },
);

module.exports = mongoose.model('user', userSchema);
