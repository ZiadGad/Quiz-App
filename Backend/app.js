const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const questionRouter = require('./routes/questionRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalHandleError = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} in this server`, 404));
});

app.use(globalHandleError);

module.exports = app;
