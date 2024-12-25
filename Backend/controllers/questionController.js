// const fs = require('fs');
const APIFeatures = require('../utils/apiFeatures');
const Question = require('../models/questionModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// const data = fs.readFileSync(`${__dirname}/../data/data.json`, 'utf-8');
// const questions = JSON.parse(data);

exports.getAll = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Question.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const questions = await features.query;
  res.status(200).json({
    status: 'success',
    results: questions.length,
    data: {
      questions,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // const question = questions.find((q) => q.id === Number(id));
  const question = await Question.findOne({ id: id });
  if (!question) return next(new AppError('No question with this id', 404));
  res.status(200).json({
    status: 'success',
    data: {
      question,
    },
  });
});
