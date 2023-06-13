const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const { ERROR_NOT_FOUND } = require('./errors/errors');

const URL = 'mongodb://localhost:27017/mestodb';
const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(URL);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '63f1c61db42c67e928e67f7d',
  };

  next();
});

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страницы по запрошенному URL не существует' });
});

app.listen(PORT);
