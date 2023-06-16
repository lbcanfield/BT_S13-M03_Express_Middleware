const USERS = require('../users/users-model')

function logger(request, response, next) {
     const
          dts = new Date().toLocaleString(),
          mthd = request.method,
          url = request.originalUrl;

     console.log(`${dts}\t[${mthd}]\trequest sent to ${url}`);
     next();
}

async function validateUserId(request, response, next) {
     const { id } = request.params;
     try {
          const fetchedUser = await USERS.getById(id);
          if (!fetchedUser) {
               response.status(404).json({
                    message: "user not found"
               })
          }
          else {
               request.user = fetchedUser;
               next();
          }
     }
     catch (error) {
          response.status(500).json({
               message: 'change this'
          })
          next();
     }
}

function validateUser(request, response, next) {
     const { name } = request.body;
     if (!name || !name.trim()) {
          response.status(400).json({
               message: 'missing required name field'
          })
     }
     else {
          request.name = name.trim();
          next();
     }
}

function validatePost(request, response, next) {
     const { text } = request.body;
     if (!text || !text.trim()) {
          response.status(400).json({
               message: "missing required text field"
          })
     }
     else {
          request.text = text.trim();
          next();
     }
}

module.exports = {
     logger,
     validatePost,
     validateUser,
     validateUserId
}