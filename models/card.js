const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
      validate: { validator: (v) => validator.isURL(v) },
    },

    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },

    likes: [{
      type: ObjectId,
      ref: 'user',
      default: [],
    }],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
