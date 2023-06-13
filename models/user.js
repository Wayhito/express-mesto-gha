const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },

  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },

  // password: {
  //   type: String,
  //   required: true,
  // },

}, { versionKey: false });

// userSchema.statics.findUserByCredentials = function findUser(email, password) {
//   return this.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             const e = new Error('Неправильные почта или пароль');
//             e.name = 'NOTAUTHORIZED';
//             return Promise.reject(e);
//           }
//           return Promise.resolve(user);
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);