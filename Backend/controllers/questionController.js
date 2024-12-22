const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8");
const questions = JSON.parse(data);

exports.getAll = (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: questions.length,
    data: {
      questions,
    },
  });
};

exports.getOne = (req, res, next) => {
  const { id } = req.params;
  const question = questions.find((q) => q.id === Number(id));
  if (!question) {
    return res.status(404).json({
      status: "fail",
      message: "No question with this id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      question,
    },
  });
};
