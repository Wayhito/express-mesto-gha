const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { validateObjectId } = require('../utils/validateObjectId');

const {
  setUserAvatar,
  setUserInfo,
  getUserInfo,
  getUsersInfo,
  getCurrentUserInfo,
} = require('../controllers/users');

const users = express.Router();

users.get('/', getUsersInfo);
users.get('/me', getCurrentUserInfo);

users.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().custom(validateObjectId),
    }),
  }),
  getUserInfo,
);

users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  setUserInfo,
);

users.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(
        /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i,
      ),
    }),
  }),
  setUserAvatar,
);

module.exports = { users };
