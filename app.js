const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { routes } = require('./routes');
const { handleError } = require('./middlewares/handleError');

const URL = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов с одного IP
});

mongoose
  .connect(URL)
  .then(() => {
    console.log(`Connected to database on ${URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use(limiter);

// Логгер запросов
app.use(requestLogger);

app.use(helmet());

app.use(routes);

app.use(errorLogger);

// Логгер ошибок
app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
