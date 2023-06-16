const express = require('express');

const server = express();

const usersRouter = require('./users/users-router.js');

const { logger } = require('./middleware/middleware');

server.use(express.json());

//Logger is used each time an API request is made
server.use(logger);

// global middlewares and the user's router need to be connected here
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
     res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
