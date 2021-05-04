const { uuid } = require('uuidv4');

module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    if (!req.body.columnId) {
      res.sendStatus(400).statusMessage('please provide columnId!');
    }
    req.body.id = uuid();
  }

  if (req.method === 'GET') {
    res.sendStatus(404);
  }

  next();
};
