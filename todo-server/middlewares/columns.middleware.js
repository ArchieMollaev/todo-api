const { uuid } = require('uuidv4');

module.exports = (req, res, next) => {
  console.log(req);
  if (req.method === 'POST') {
    req.body.id = uuid();
    req.body.userId = req.user.sub;
  }

  if (req.method === 'PATCH') {
    req.body.userId = req.user.sub;
  }

  if (req.method === 'GET') {
    req.query.userId = req.user.sub;
  }

  next();
};
