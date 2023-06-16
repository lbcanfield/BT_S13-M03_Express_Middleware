const express = require('express');

//model imports
const USERS = require('./users-model.js');
const POSTS = require('../posts/posts-model.js');

//middleware imports
const {
     validateUserId,
     validateUser,
     validatePost
} = require('../middleware/middleware.js')

const router = express.Router();

router.get('/', async (request, response, next) => {
     try {
          response.status(200).json(await USERS.get());
     }
     catch (error) {
          next(error);
     }
});

router.get('/:id', validateUserId, (request, response) => {
     response.json(request.user);
});

router.post('/', validateUser, async (request, response, next) => {
     try {
          const newUser = await USERS.insert({ name: request.name });
          response.json(newUser);
          // console.log(newUser);
     }
     catch (error) {
          next(error);
     }
});

router.put('/:id', validateUserId, validateUser, (request, response) => {
     // RETURN THE FRESHLY UPDATED USER OBJECT
     // this needs a middleware to verify user id
     // and another middleware to check that the request body is valid
     console.log(request.user)
});

router.delete('/:id', validateUserId, (request, response) => {
     // RETURN THE FRESHLY DELETED USER OBJECT
     // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (request, response) => {
     // RETURN THE ARRAY OF USER POSTS
     // this needs a middleware to verify user id
     console.log(request.text)
});

router.post('/:id/posts', validateUserId, validatePost, (request, response) => {
     // RETURN THE NEWLY CREATED USER POST
     // this needs a middleware to verify user id
     // and another middleware to check that the request body is valid
     console.log(request.user, '\n', request.text)
});

router.use((error, request, response, next) => {
     response.status(error.status || 500).json({
          ErrorMessage: error.message
     })
     console.log(error)
})

module.exports = router;
