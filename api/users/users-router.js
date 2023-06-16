const express = require('express');

//model imports
const USERS = require('./users-model.js');
const POSTS = require('../posts/posts-model.js');

//middleware imports
const {
     validateUserId
} = require('../middleware/middleware.js')

const router = express.Router();

router.get('/', async (request, response) => {
     response.status(200).json(await USERS.get());
});

router.get('/:id', validateUserId, (request, response) => {
     response.json(request.user);
});

router.post('/', (request, response) => {
     // RETURN THE NEWLY CREATED USER OBJECT
     // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, (request, response) => {
     // RETURN THE FRESHLY UPDATED USER OBJECT
     // this needs a middleware to verify user id
     // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (request, response) => {
     // RETURN THE FRESHLY DELETED USER OBJECT
     // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (request, response) => {
     // RETURN THE ARRAY OF USER POSTS
     // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, (request, response) => {
     // RETURN THE NEWLY CREATED USER POST
     // this needs a middleware to verify user id
     // and another middleware to check that the request body is valid
});

module.exports = router;
