const express = require('express');
const morgan = require('morgan');
const questionRouter = require('./routes/questionRoutes');
const cors = require('cors'); 
const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1/questions', questionRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Not found',
  });
});

module.exports = app;
