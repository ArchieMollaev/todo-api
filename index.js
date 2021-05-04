// server.js
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const middlewares = jsonServer.defaults();
const columnsMiddleware = require('./middlewares/columns.middleware');
const tasksMiddleware = require('./middlewares/tasks.middleware');

require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw new Error('Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file');
}

if (!process.env.PORT) {
  throw new Error('Make sure you have PORT in your .env file');
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: [process.env.AUTH0_DOMAIN],
  algorithms: ['RS256'],
});

server.use(middlewares);
server.use(checkJwt);
server.use(jsonServer.bodyParser);

server.use('/columns', columnsMiddleware);
server.use('/tasks', tasksMiddleware);

server.use(router);

server.listen(process.env.PORT, () => {
  console.log(`JSON Server is running ${process.env.PORT}`);
});
