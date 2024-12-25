const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/AI/quiz.json`, 'utf-8'));

data.forEach((doc, index) => {
  doc.id = index + 1;
});

fs.writeFileSync(`${__dirname}/AI/data.json`, JSON.stringify(data));
