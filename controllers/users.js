const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFound');

const User = require('../models/user');

function registerUser(req, res, next) {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))

    .then((newUser) => {
      if (!newUser) {
        return next(new NotFoundError('Объект не найден'));
      } return res.send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
        _id: newUser._id,
      });
    })

    .catch(next);
}

function loginUser(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        throw new UnauthorizedError('Неправильная почта или пароль');
      } return bcrypt.compare(password, user.password)

        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильная почта или пароль');
          } const token = jwt.sign({ _id: user._id }, 'secretkey', { expiresIn: '7d' });

          res.cookie('jwt', token, { maxAge: 3600000 * 7, httpOnly: true, sameSite: true }).send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          });
        });
    })
    .catch(next);
}

function getUsersInfo(_, res, next) {
  User
    .find({})
    .then((users) => res.status(200).send({ users }))
    .catch(next);
}

function getUserInfo(req, res, next) {
  const { id } = req.params;

  User
    .findById(id)
    .then((user) => {
      if (user) return res.status(200).send({ user });

      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch(next);
}

function getCurrentUserInfo(req, res, next) {
  const { userId } = req.user;

  User
    .findById(userId)
    .then((user) => {
      if (user) return res.status(200).send({ user });

      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch(next);
}

function setUserInfo(req, res, next) {
  const { name, about } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(
      userId,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.status(200).send({ user });

      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch(next);
}

function setUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(
      userId,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.status(200).send({ user });

      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch(next);
}

module.exports = {
  registerUser,
  loginUser,

  getUsersInfo,
  getUserInfo,
  getCurrentUserInfo,

  setUserInfo,
  setUserAvatar,
};
