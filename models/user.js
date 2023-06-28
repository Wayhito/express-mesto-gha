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
      validate: {
        validator: validator.isEmail,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },

    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: validator.isURL,
      },
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
